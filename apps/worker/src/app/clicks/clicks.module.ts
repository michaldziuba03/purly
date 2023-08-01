import { Module } from '@nestjs/common';
import { ClicksProcessor } from './clicks.processor';
import { AnalyticsModule } from '@purly/analytics';

@Module({
  imports: [AnalyticsModule],
  providers: [ClicksProcessor],
})
export class ClicksModule {}
