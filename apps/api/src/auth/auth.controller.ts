import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAccountDTO } from '../account/dto';
import { Account } from '../account/account.schema';
import { Request } from 'express';
import { AuthenticatedGuard, GuestGuard } from './guards/auth.guard';
import { mapEntity } from '../common/utils';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { LoginDTO, ForgotPasswordDTO } from './dto';
import { User } from '../common/decorators/user.decorator';
import {
  OAuthFacebookGuard,
  OAuthGithubGuard,
  OAuthGoogleGuard,
} from './guards/oauth.guard';
import { RecaptchaGuard } from '../common/guards/recaptcha.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('forgot')
  @UseGuards(GuestGuard)
  async forgotPassword(@Body() data: ForgotPasswordDTO) {
    await this.authService.forgotPassword(data.email);
    // even if account doesn't exist, we will return message "Email sent":
    return {
      message: 'Email sent. Check your inbox and open link to continue.',
    };
  }

  @Post('register')
  @UseGuards(GuestGuard, RecaptchaGuard)
  @ApiCreatedResponse({ type: Account })
  async register(@Body() data: CreateAccountDTO, @Req() req: Request) {
    const account = await this.authService.register(data);
    if (!account) {
      throw new BadRequestException('Account already exists');
    }

    await this.createSession(req, account as Account);
    return mapEntity(account, Account);
  }

  @Post('login')
  @UseGuards(GuestGuard, RecaptchaGuard)
  @ApiCreatedResponse({ type: Account })
  async login(@Body() data: LoginDTO, @Req() req: Request) {
    const account = await this.authService.login(data);
    if (!account) {
      throw new BadRequestException('Invalid email or password');
    }

    await this.createSession(req, account);
    return mapEntity(account, Account);
  }

  @Post('logout')
  @UseGuards(AuthenticatedGuard)
  async logout(@Req() req: Request) {
    await new Promise<void>((resolve, reject) => {
      req.logOut({ keepSessionInfo: false }, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    req.session.cookie.maxAge = 0;
  }

  @Post('federated/google')
  @UseGuards(new GuestGuard(), OAuthGoogleGuard)
  async googleLogin(@User() account: Account) {
    return mapEntity(account, Account);
  }

  @Post('federated/facebook')
  @UseGuards(new GuestGuard(), OAuthFacebookGuard)
  async facebookLogin(@User() account: Account) {
    return mapEntity(account, Account);
  }

  @Post('federated/github')
  @UseGuards(new GuestGuard(), OAuthGithubGuard)
  async githubLogin(@User() account: Account) {
    return mapEntity(account, Account);
  }

  private createSession(req: Request, user: Partial<Account>) {
    return new Promise<void>((resolve, reject) => {
      req.login(user, (err) => {
        if (err) return reject(err);

        return resolve();
      });
    });
  }
}
