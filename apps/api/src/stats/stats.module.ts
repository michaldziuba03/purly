import { Module } from '@nestjs/common';
import { AnalyticsModule } from '@purly/analytics';
import { GetTopBrowsers } from './usecases/get-top-browsers.usecase';
import { StatsController } from './stats.controller';
import { GetTopOS } from './usecases/get-top-os.usecase';
import { GetTopCountries } from './usecases/get-top-countries.usecase';
import { GetTopReferers } from './usecases/get-top-referers.usecase';

@Module({
  imports: [AnalyticsModule],
  providers: [GetTopBrowsers, GetTopOS, GetTopCountries, GetTopReferers],
  controllers: [StatsController],
})
export class StatsModule {}
