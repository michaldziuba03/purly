import { OAuthProviders } from '@purly/shared';
import { Exclude, Expose, Type } from 'class-transformer';

export class User {
  id: string;

  email: string;

  username: string;

  @Exclude({ toPlainOnly: true })
  pictureKey: string;

  @Exclude({ toPlainOnly: true })
  pictureUrl: string;

  @Expose()
  get picture() {
    if (this.pictureKey) {
      const prefix =
        process.env['CDN_URL'] ||
        `${process.env['S3_ENDPOINT']}/${process.env['S3_BUCKET_NAME']}`;
      return `${prefix}/${this.pictureKey}`;
    }

    // in case of default avatars from Google/GitHub providers
    return this.pictureUrl;
  }

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
  pictureUrl: string;
}

export class OAuthAccount {
  providerName: OAuthProviders;
  providerId: string;
  userId: string;
}
