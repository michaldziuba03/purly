import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountModule } from '../account/account.module';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [
    AccountModule,
    PassportModule.register({
      session: true,
    }),
  ],
  providers: [AuthService, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
