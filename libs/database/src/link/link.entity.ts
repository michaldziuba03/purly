export class Link {
  id: string;
  alias: string;
  url: string;
  workspaceId: string;
  name?: string;
  expiresAt?: Date;
  isActive: boolean;
  isButton: boolean;
  androidRedirect?: string;
  iosRedirect?: string;
  enableUtm: boolean;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

export type InsertLink = Omit<Link, 'id'>;
