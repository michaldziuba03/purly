import { LinkRepository } from '@purly/postgres';
import { Usecase } from '../../shared/base.usecase';
import { Injectable } from '@nestjs/common';
import { UtmParamsDto } from '../dto/utm-params.dto';

interface IUpdateLinkCommand extends UtmParamsDto {
  alias: string;
  userId: string;
  name?: string;
  url?: string;
  isArchived?: boolean;
}

@Injectable()
export class UpdateLink implements Usecase<IUpdateLinkCommand> {
  constructor(private readonly linkRepository: LinkRepository) {}

  async execute(command: IUpdateLinkCommand) {
    return this.linkRepository.updateOne(command.alias, command.userId, {
      url: command.url,
      name: command.name,
      isArchived: command.isArchived,
      enableUtm: command.enableUtm,
      utmCampaign: command.utmCampaign,
      utmContent: command.utmCampaign,
      utmMedium: command.utmMedium,
      utmTerm: command.utmTerm,
      utmSource: command.utmSource,
    });
  }
}
