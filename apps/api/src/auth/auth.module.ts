import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountModule } from '../account/account.module';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './session.serializer';
import { GithubStrategy, GoogleStrategy, FacebookStrategy } from './strategies';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [
    AccountModule,
    TokenModule,
    PassportModule.register({
      session: true,
    }),
  ],
  providers: [
    AuthService,
    GoogleStrategy,
    GithubStrategy,
    FacebookStrategy,
    SessionSerializer,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
