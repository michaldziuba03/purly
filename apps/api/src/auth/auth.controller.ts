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
import { Providers } from '@purly/postgres';
import { AuthGuard } from '@nestjs/passport';
import { UserSession } from '../shared/user.decorator';
import { OAuthProfile } from './auth.interface';
import { GuestGuard } from './guards/guest.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly registerUsecase: Register,
    private readonly loginUsecase: Login,
    private readonly oauthUsecase: OAuth2
  ) {}

  @Post('register')
  @UseGuards(GuestGuard)
  async register(@Body() body: RegisterDto, @Req() req: Request) {
    const user = await this.registerUsecase.execute({
      email: body.email,
      name: body.name,
      password: body.password,
    });

    await this.createSession(req, user.id);

    return user;
  }

  @Post('login')
  @UseGuards(GuestGuard)
  async login(@Req() req: Request, @Body() body: LoginDto) {
    const user = await this.loginUsecase.execute({
      email: body.email,
      password: body.password,
    });
    await this.createSession(req, user.id);

    return user;
  }

  // OAuth2 redirects and callbacks:
  @Get('github')
  @UseGuards(GuestGuard)
  @UseGuards(AuthGuard(Providers.GITHUB))
  async githubLogin() {
    return;
  }

  @Get('github/callback')
  @UseGuards(GuestGuard)
  @UseGuards(AuthGuard(Providers.GITHUB))
  async githubCallback(
    @Req() req: Request,
    @UserSession() profile: OAuthProfile
  ) {
    const userId = await this.oauthUsecase.execute(profile);
    await this.createSession(req, userId);
  }

  @Get('google')
  @UseGuards(AuthGuard(Providers.GOOGLE))
  async googleLogin() {
    return;
  }

  @Get('google/callback')
  @UseGuards(AuthGuard(Providers.GOOGLE))
  async googleCallback(
    @Req() req: Request,
    @UserSession() profile: OAuthProfile
  ) {
    const userId = await this.oauthUsecase.execute(profile);
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
