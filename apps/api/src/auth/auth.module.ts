import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User, ResetToken } from '@purly/db';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [User, ResetToken],
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
