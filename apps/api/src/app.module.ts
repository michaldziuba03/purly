import { Module } from '@nestjs/common';
import { PostgresModule } from '@purly/postgres';
import { RedisModule } from '@purly/redis';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [RedisModule, PostgresModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
