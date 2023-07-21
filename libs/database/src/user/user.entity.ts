import { OAuthProviders } from '@purly/shared';
import { Exclude, Type } from 'class-transformer';

export class User {
  id: string;

  email: string;

  username: string;

  picture: string;

  @Exclude({ toPlainOnly: true })
  password: string;

  createdAt: Date;

  updatedAt: Date;

  @Type(() => OAuthAccount)
  accounts: OAuthAccount[];
}

export class InsertUser implements Partial<User> {
  email: string;
  username: string;
  password: string;
  picture: string;
}

export class OAuthAccount {
  providerName: OAuthProviders;
  providerId: string;
  userId: string;
}
