import { Module } from '@nestjs/common';
import { Register } from './usecases/register.usecase';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Login } from './usecases/login.usecase';
import { OAuth2 } from './usecases/oauth2.usecase';
import { SessionSerializer } from './session/session.serializer';
import { GoogleStrategy } from './strategies/google.strategy';
import { GithubStrategy } from './strategies/github.strategy';
import { ForgotPassword } from './usecases/forgot-password.usecase';
import { ChangePassword } from './usecases/change-password.usecase';

@Module({
  providers: [
    Register,
    Login,
    ForgotPassword,
    ChangePassword,
    AuthService,
    OAuth2,
    GoogleStrategy,
    GithubStrategy,
    SessionSerializer,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
