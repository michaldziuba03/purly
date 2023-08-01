import { Injectable } from '@nestjs/common';
import { AnalyticsService } from '@purly/analytics';
import { Usecase } from '../../shared/base.usecase';

interface IGetTopCountriesCommand {
  linkId: string;
}

@Injectable()
export class GetTopCountries implements Usecase<IGetTopCountriesCommand> {
  constructor(private readonly analyticsService: AnalyticsService) {}

  execute(command: IGetTopCountriesCommand) {
    return this.analyticsService.getTopCountries(command.linkId);
  }
}
