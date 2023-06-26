import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PostgresModule } from '@purly/postgres';
import { RedisModule } from '@purly/redis';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LinkModule } from './link/link.module';
import { ReportModule } from './report/report.module';
import { BillingModule } from './billing/billing.module';
import { HealthModule } from './health/health.module';
import { StatsModule } from './stats/stats.module';
import { LoggerModule } from '@purly/logger';
import { BioModule } from './bio/bio.module';
import { WorkspaceModule } from './workspace/workspace.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    LoggerModule.forRoot(),
    HealthModule,
    RedisModule,
    PostgresModule,
    AuthModule,
    UserModule,
    LinkModule,
    ReportModule,
    BillingModule,
    StatsModule,
    BioModule,
    WorkspaceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
