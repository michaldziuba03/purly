import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Login } from './usecases/login.usecase';
import { Register } from './usecases/register.usecase';
import { OAuth2 } from './usecases/oauth2.usecase';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Providers } from '@purly/postgres';
import { AuthGuard } from '@nestjs/passport';
import { UserSession } from '../shared/user.decorator';
import { OAuthProfile } from './auth.interface';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly registerUsecase: Register,
    private readonly loginUsecase: Login,
    private readonly oauthUsecase: OAuth2
  ) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.registerUsecase.execute({
      email: body.email,
      name: body.name,
      password: body.password,
    });
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.loginUsecase.execute({
      email: body.email,
      password: body.password,
    });
  }

  // OAuth2 redirects and callbacks:
  @Get('github')
  @UseGuards(AuthGuard(Providers.GITHUB))
  async githubLogin() {
    return;
  }

  @Get('github/callback')
  @UseGuards(AuthGuard(Providers.GITHUB))
  async githubCallback(@UserSession() profile: OAuthProfile) {
    const user = await this.oauthUsecase.execute(profile);
    return user;
  }

  @Get('google')
  @UseGuards(AuthGuard(Providers.GOOGLE))
  async googleLogin() {
    return;
  }

  @Get('google/callback')
  @UseGuards(AuthGuard(Providers.GOOGLE))
  async googleCallback(@UserSession() profile: OAuthProfile) {
    const user = await this.oauthUsecase.execute(profile);
    return user;
  }
}
