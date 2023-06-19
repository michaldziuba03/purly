import { Injectable } from '@nestjs/common';
import { isAfter } from 'date-fns';
import { Usecase } from '../../shared/base.usecase';
import { GetLink } from './get-link.usecase';
import { DetectDevice, OS } from '../../shared/detect-device';

interface IRedirectLinkCommand {
  alias: string;
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

    if (link.expiresAt && isAfter(new Date(), link.expiresAt)) {
      return;
    }

    const device = new DetectDevice(command.userAgent);

    if (link.androidRedirect && device.os === OS.ANDROID) {
      return link.androidRedirect;
    }

    if (link.iosRedirect && device.os === OS.IOS) {
      return link.iosRedirect;
    }

    if (link.enableUtm) {
      const utmUrl = new URL(link.url);

      link.utmCampaign &&
        utmUrl.searchParams.set('utm_campaign', link.utmCampaign);
      link.utmContent &&
        utmUrl.searchParams.set('utm_content', link.utmContent);
      link.utmMedium && utmUrl.searchParams.set('utm_medium', link.utmMedium);
      link.utmSource && utmUrl.searchParams.set('utm_source', link.utmSource);
      link.utmTerm && utmUrl.searchParams.set('utm_term', link.utmTerm);

      return utmUrl.toString();
    }

    return link.url;
  }
}
