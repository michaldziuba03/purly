import { OAuthProviders } from '@purly/database';

export interface OAuthProfile {
  picture?: string;
  username: string;
  email: string;
  providerName: OAuthProviders;
  providerId: string;
}
