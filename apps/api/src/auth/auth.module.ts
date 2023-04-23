import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SessionSerializer } from './session/session.serializer';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';
import { GithubStrategy } from './strategies/github.strategy';
import { BullModule } from '@nestjs/bull';
import { MAIL_QUEUE } from '@libs/jobs';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    BullModule.registerQueue({ name: MAIL_QUEUE }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, GithubStrategy, SessionSerializer],
})
export class AuthModule {}
