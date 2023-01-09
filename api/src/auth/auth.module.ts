import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountModule } from 'src/account/account.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AccountModule,
    JwtModule.register({})
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
