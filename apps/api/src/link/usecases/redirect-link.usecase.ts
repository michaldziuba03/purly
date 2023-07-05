import { Injectable } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { GetLink } from './get-link.usecase';
import { DetectDevice } from '../../shared/detect-device';
import { UtmBuilder } from '../utm.builder';
import { isExpired } from '../../shared/utils';

interface IRedirectLinkCommand {
  alias: string;
  remoteAddress: string;
  referer?: string;
  userAgent?: string;
}

@Injectable()
export class RedirectLink implements Usecase<IRedirectLinkCommand> {
  constructor(private readonly getLinkUsecase: GetLink) {}

  async execute(command: IRedirectLinkCommand): Promise<string> {
    const link = await this.getLinkUsecase.execute({
      alias: command.alias,
    });

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
