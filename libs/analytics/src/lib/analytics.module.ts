import { Module } from '@nestjs/common';
import { ClickHouseModule } from '@md03/nestjs-clickhouse';
import { AnalyticsService } from './analytics.service';

@Module({
  imports: [
    ClickHouseModule.forRoot({
      host: process.env['CLICKHOUSE_HOST'],
      username: process.env['CLICKHOUSE_USER'],
      password: process.env['CLICKHOUSE_PASS'],
    }),
  ],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
