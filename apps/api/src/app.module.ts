import { Module } from '@nestjs/common';
import { QueueModule } from '@purly/queue';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DatabaseModule } from '@purly/database';
import { LoggerModule } from '@purly/logger';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from '@mich4l/nestjs-redis';
import { UserModule } from './user/user.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { HealthModule } from './health/health.module';
import { LinkModule } from './link/link.module';
import { ReportModule } from './report/report.module';
import { BillingModule } from './billing/billing.module';
import { MemberModule } from './member/member.module';
import { BioModule } from './bio/bio.module';
import { StatsModule } from './stats/stats.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    LoggerModule.forRoot(),
    QueueModule,
    DatabaseModule,
    UploadModule,
    RedisModule.forRoot({ connectUrl: process.env['REDIS_URI'] }),
    EventEmitterModule.forRoot(),
    HealthModule,
    AuthModule,
    UserModule,
    WorkspaceModule,
    MemberModule,
    BillingModule,
    LinkModule,
    ReportModule,
    BioModule,
    StatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
