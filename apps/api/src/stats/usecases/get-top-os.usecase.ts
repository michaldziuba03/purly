import { Injectable } from '@nestjs/common';
import { AnalyticsService } from '@purly/analytics';
import { Usecase } from '../../shared/base.usecase';

interface IGetTopOSCommand {
  linkId: string;
}

@Injectable()
export class GetTopOS implements Usecase<IGetTopOSCommand> {
  constructor(private readonly analyticsService: AnalyticsService) {}

  execute(command: IGetTopOSCommand) {
    return this.analyticsService.getTopOS(command.linkId);
  }
}
