export class Link {
  id: string;
  alias: string;
  url: string;
  workspaceId: string;
  name?: string;
  isActive?: boolean;
  expiresAt?: Date;
  androidRedirect?: string;
  iosRedirect?: string;
  enableUtm: boolean;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type InsertLink = Omit<Link, 'id'>;
