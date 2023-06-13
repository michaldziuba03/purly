import { Providers } from '@purly/postgres';

export interface OAuthProfile {
  picture?: string;
  name: string;
  email: string;
  provider: Providers;
  subject: string;
}
