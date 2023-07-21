import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from '@purly/database';
import { NotificationModule } from './notification/notification.module';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [
    DatabaseModule,
    ScheduleModule.forRoot(),
    CronModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
