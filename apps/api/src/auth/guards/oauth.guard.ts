import { AuthGuard } from '@nestjs/passport';

export const OAuthGoogleGuard = AuthGuard('google');
export const OAuthFacebookGuard = AuthGuard('facebook');
export const OAuthGithubGuard = AuthGuard('github');
