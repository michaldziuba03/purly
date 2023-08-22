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
  createdAt?: Date;
  updatedAt?: Date;
}

export type InsertLink = Omit<Link, 'id'>;
