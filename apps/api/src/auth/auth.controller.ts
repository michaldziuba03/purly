import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Headers,
  Ip,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginDTO,
  RegisterDTO,
  ResetPasswordDTO,
  ResetPasswordRequestDTO,
} from './dto';
import { Account } from '@libs/data';
import { Request } from 'express';
import { GuestGuard } from './guards/guest.guard';
import { AuthenticatedGuard } from './guards/auth.guard';
import { VerifyAccountDto } from './dto/verify-account.dto';
import { UserSession } from '../shared/decorators/user.decorator';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private createAuthSession(req: Request, user: Partial<Account>) {
    return new Promise<void>((resolve, reject) => {
      req.login(user, (err) => {
        if (err) return reject(err);

        return resolve();
      });
    });
  }

  @Post('register')
  @UseGuards(GuestGuard)
  async register(@Body() data: RegisterDTO, @Req() req: Request) {
    const account = await this.authService.register(data);
    await this.createAuthSession(req, account);

    return account;
  }

  @Post('login')
  @UseGuards(GuestGuard)
  async login(@Body() data: LoginDTO, @Req() req: Request) {
    const account = await this.authService.login(data);
    await this.createAuthSession(req, account);

    return account;
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

  @Post('verify')
  async verifyAccount(@Body() body: VerifyAccountDto) {
    return this.authService.verifyAccount(body);
  }

  @Post('verify/resend')
  @UseGuards(AuthenticatedGuard)
  async verifyResend(@UserSession('id') userId: string) {
    return this.authService.resendVerification(userId);
  }

  @Post('reset/request')
  @UseGuards(GuestGuard)
  async resetPasswordRequest(
    @Body() data: ResetPasswordRequestDTO,
    @Headers('user-agent') agent: string,
    @Ip() ip: string,
  ) {
    await this.authService.resetPasswordRequest(data, { agent, ip });

    return {
      message: 'Email sent. Check your inbox and open link to continue.',
    };
  }

  @Post('reset')
  @UseGuards(GuestGuard)
  resetPassword(@Body() data: ResetPasswordDTO) {
    return this.authService.resetPassword(data);
  }
}
