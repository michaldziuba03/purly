import { Injectable } from '@nestjs/common';
import { AnalyticsService } from '@purly/analytics';
import { Usecase } from '../../shared/base.usecase';

interface IGetTopReferersCommand {
  linkId: string;
}

@Injectable()
export class GetTopReferers implements Usecase<IGetTopReferersCommand> {
  constructor(private readonly analyticsService: AnalyticsService) {}

  execute(command: IGetTopReferersCommand) {
    return this.analyticsService.getTopReferers(command.linkId);
  }
}
