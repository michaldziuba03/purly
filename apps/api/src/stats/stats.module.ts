import { Module } from '@nestjs/common';
import { AnalyticsModule } from '@purly/analytics';
import { StatsController } from './stats.controller';

@Module({
  imports: [AnalyticsModule],
  controllers: [StatsController],
})
export class StatsModule {}
