import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from '@purly/database';
import { LoggerModule } from '@purly/logger';
import { NotificationModule } from './notification/notification.module';
import { CronModule } from './cron/cron.module';
import { InMemoryModule } from '@purly/in-memory';
import { QueueModule } from '@purly/queue';
import { ClicksModule } from './clicks/clicks.module';

@Module({
  imports: [
    LoggerModule.forRoot(),
    QueueModule,
    DatabaseModule,
    InMemoryModule,
    ScheduleModule.forRoot(),
    CronModule,
    NotificationModule,
    ClicksModule,
  ],
})
export class AppModule {}
