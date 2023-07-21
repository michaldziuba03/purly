import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import type { Request } from 'express';
import { Login } from './usecases/login.usecase';
import { Register } from './usecases/register.usecase';
import { OAuth2 } from './usecases/oauth2.usecase';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { OAuthProviders } from '@purly/shared';
import { AuthGuard } from '@nestjs/passport';
import { UserSession } from '../shared/user.decorator';
import { OAuthProfile } from './auth.interface';
import { GuestGuard } from './guards/guest.guard';
import { AuthenticatedGuard } from './guards/auth.guard';
import { RecaptchaGuard } from '../shared/recaptcha.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPassword } from './usecases/forgot-password.usecase';
import { ChangePassword } from './usecases/change-password.usecase';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly registerUsecase: Register,
    private readonly loginUsecase: Login,
    private readonly oauth2Usecase: OAuth2,
    private readonly forgotPasswordUsecase: ForgotPassword,
    private readonly changePasswordUsecase: ChangePassword
  ) {}

  @Post('register')
  @UseGuards(GuestGuard, RecaptchaGuard)
  async register(@Body() body: RegisterDto, @Req() req: Request) {
    const user = await this.registerUsecase.execute({
      email: body.email,
      username: body.username,
      password: body.password,
    });

    await this.createSession(req, user.id);

    return user;
  }

  @Post('login')
  @UseGuards(GuestGuard, RecaptchaGuard)
  async login(@Req() req: Request, @Body() body: LoginDto) {
    const user = await this.loginUsecase.execute({
      email: body.email,
      password: body.password,
    });
    await this.createSession(req, user.id);

    return user;
  }

  @Post('reset/request')
  @UseGuards(GuestGuard)
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    await this.forgotPasswordUsecase.execute({
      email: body.email,
    });

    return { message: 'We sent email with reset link. Check your inbox.' };
  }

  @Post('reset')
  @UseGuards(GuestGuard)
  async changePasssword(@Body() body: ChangePasswordDto) {
    const user = await this.changePasswordUsecase.execute({
      token: body.token,
      password: body.password,
    });

    return user;
  }

  // OAuth2 redirects and callbacks:
  @Get('github')
  @UseGuards(GuestGuard)
  @UseGuards(AuthGuard(OAuthProviders.GITHUB))
  async githubLogin() {
    return;
  }

  @Get('github/callback')
  @UseGuards(AuthGuard(OAuthProviders.GITHUB))
  async githubCallback(
    @Req() req: Request,
    @UserSession() profile: OAuthProfile
  ) {
    const userId = await this.oauth2Usecase.execute(profile);
    await this.createSession(req, userId);
  }

  @Get('google')
  @UseGuards(GuestGuard)
  @UseGuards(AuthGuard(OAuthProviders.GOOGLE))
  async googleLogin() {
    return;
  }

  @Get('google/callback')
  @UseGuards(AuthGuard(OAuthProviders.GOOGLE))
  async googleCallback(
    @Req() req: Request,
    @UserSession() profile: OAuthProfile
  ) {
    const userId = await this.oauth2Usecase.execute(profile);
    await this.createSession(req, userId);
  }

  // Session related methods:
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

  private createSession(req: Request, userId: string) {
    return new Promise<void>((resolve, reject) => {
      req.login({ id: userId }, (err) => {
        if (err) return reject(err);

        return resolve();
      });
    });
  }
}
