import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { Login } from './usecases/login.usecase';
import { Register } from './usecases/register.usecase';
import { OAuth2 } from './usecases/oauth2.usecase';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { GithubStrategy } from './strategies/github.strategy';

@Module({
  providers: [
    AuthService,
    Login,
    Register,
    OAuth2,
    GoogleStrategy,
    GithubStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
