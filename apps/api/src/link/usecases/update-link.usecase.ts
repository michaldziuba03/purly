import { LinkRepository } from '@purly/postgres';
import { Usecase } from '../../shared/base.usecase';
import { Injectable } from '@nestjs/common';
import { UtmParamsDto } from '../dto/utm-params.dto';

interface IUpdateLinkCommand extends UtmParamsDto {
  alias: string;
  userId: string;
  name?: string;
  expiresAt?: string;
  url?: string;
  isActive?: boolean;
  androidRedirect?: string;
  iosRedirect?: string;
}

@Injectable()
export class UpdateLink implements Usecase<IUpdateLinkCommand> {
  constructor(private readonly linkRepository: LinkRepository) {}

  async execute(command: IUpdateLinkCommand) {
    return this.linkRepository.updateOne(command.alias, command.userId, {
      url: command.url,
      name: command.name,
      expiresAt: command.expiresAt ? new Date(command.expiresAt) : undefined,
      isActive: command.isActive,
      enableUtm: command.enableUtm,
      utmCampaign: command.utmCampaign,
      utmContent: command.utmCampaign,
      utmMedium: command.utmMedium,
      utmTerm: command.utmTerm,
      utmSource: command.utmSource,
      androidRedirect: command.androidRedirect,
      iosRedirect: command.iosRedirect,
    });
  }
}
