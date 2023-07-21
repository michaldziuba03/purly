import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';
import { OAuthProfile } from '../auth.interface';
import { OAuthProviders } from '@purly/shared';

@Injectable()
export class GithubStrategy extends PassportStrategy(
  Strategy,
  OAuthProviders.GITHUB
) {
  constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      session: false,
      callbackURL: '/api/auth/github/callback',
      scope: ['user:email'],
      allRawEmails: true,
    });
  }

  validate(_, __, profile: Profile): OAuthProfile {
    const email = this.getEmail(profile.emails as GithubEmail[]);
    if (!email) {
      throw new UnauthorizedException('Unverified GitHub account');
    }

    return {
      email,
      providerName: OAuthProviders.GITHUB,
      providerId: profile.id,
      username: profile.displayName || profile.username,
      picture: this.getPhoto(profile.photos),
    };
  }

  private getPhoto(photos?: Array<{ value: string }>) {
    if (photos && photos.length) {
      return photos[0].value;
    }

    return;
  }

  private getEmail(emails: GithubEmail[]) {
    if (!emails) {
      return;
    }

    const primaryEmail = emails.find(
      (email) => email.primary && email.verified
    );
    if (!primaryEmail) {
      return;
    }

    return primaryEmail.value;
  }
}

export interface GithubEmail {
  value: string;
  verified: boolean;
  primary: boolean;
}
