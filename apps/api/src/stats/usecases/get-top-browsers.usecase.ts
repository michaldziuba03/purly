import { Injectable } from '@nestjs/common';
import { AnalyticsService } from '@purly/analytics';
import { Usecase } from '../../shared/base.usecase';

interface IGetTopBrowsersCommand {
  linkId: string;
}

@Injectable()
export class GetTopBrowsers implements Usecase<IGetTopBrowsersCommand> {
  constructor(private readonly analyticsService: AnalyticsService) {}

  execute(command: IGetTopBrowsersCommand) {
    return this.analyticsService.getTopBrowsers(command.linkId);
  }
}
