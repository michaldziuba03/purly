import { Module } from '@nestjs/common';
import { PostgresModule } from '@purly/postgres';
import { RedisModule } from '@purly/redis';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LinkModule } from './link/link.module';
import { ReportModule } from './report/report.module';
import { BillingModule } from './billing/billing.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    HealthModule,
    RedisModule,
    PostgresModule,
    AuthModule,
    UserModule,
    LinkModule,
    ReportModule,
    BillingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
