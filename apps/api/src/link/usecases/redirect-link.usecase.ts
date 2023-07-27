import { Injectable } from '@nestjs/common';
import { LinkRepository } from '@purly/database';
import { Usecase } from '../../shared/base.usecase';
import { DetectDevice } from '../../shared/detect-device';
import { UtmBuilder } from '../utm.builder';
import { isExpired } from '../../shared/utils';
import { ClicksProducer } from '@purly/queue';

interface IRedirectLinkCommand {
  alias: string;
  remoteAddress: string;
  referer?: string;
  userAgent?: string;
}

@Injectable()
export class RedirectLink implements Usecase<IRedirectLinkCommand> {
  constructor(
    private readonly linkRepository: LinkRepository,
    private readonly clicksProducer: ClicksProducer
  ) {}

  async execute(command: IRedirectLinkCommand): Promise<string> {
    const link = await this.linkRepository.findOneByAlias(command.alias);

    if (!link) {
      return;
    }

    if (!link.isActive) {
      return;
    }

    if (link.expiresAt && isExpired(link.expiresAt)) {
      return;
    }

    const device = new DetectDevice(command.userAgent, command.remoteAddress);
    // will record click for the stats
    this.clicksProducer.recordClick({
      linkId: link.id,
      browser: device.browser,
      country: device.country,
      os: device.os,
      referer: command.referer,
    });

    if (link.androidRedirect && device.isAndroid) {
      return link.androidRedirect;
    }

    if (link.iosRedirect && device.isIOS) {
      return link.iosRedirect;
    }

    if (link.enableUtm) {
      return new UtmBuilder(link.url).buildLink({
        utmCampaign: link.utmCampaign,
        utmContent: link.utmContent,
        utmMedium: link.utmMedium,
        utmSource: link.utmSource,
        utmTerm: link.utmTerm,
      });
    }

    return link.url;
  }
}
