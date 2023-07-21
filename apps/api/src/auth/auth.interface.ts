import { OAuthProviders } from '@purly/shared';

export interface OAuthProfile {
  picture?: string;
  username: string;
  email: string;
  providerName: OAuthProviders;
  providerId: string;
}
