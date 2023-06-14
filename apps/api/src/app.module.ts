import { Module } from '@nestjs/common';
import { PostgresModule } from '@purly/postgres';
import { RedisModule } from '@purly/redis';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LinkModule } from './link/link.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    RedisModule,
    PostgresModule,
    AuthModule,
    UserModule,
    LinkModule,
    ReportModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
