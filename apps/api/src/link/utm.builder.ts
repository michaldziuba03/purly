import { UtmParamsDto } from './dto/utm-params.dto';

export class UtmBuilder {
  private readonly url: URL;

  constructor(baseUrl: string) {
    this.url = new URL(baseUrl);
  }

  private setParam(name: string, value?: string) {
    if (!value) return;

    this.url.searchParams.set(name, value);
  }

  buildLink(utmParams: UtmParamsDto): string {
    this.setParam('utm_campaign', utmParams.utmCampaign);
    this.setParam('utm_content', utmParams.utmContent);
    this.setParam('utm_medium', utmParams.utmMedium);
    this.setParam('utm_source', utmParams.utmSource);
    this.setParam('utm_term', utmParams.utmTerm);

    return this.url.toString();
  }
}
