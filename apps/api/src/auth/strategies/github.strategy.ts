import {
  getGithubEmails,
  GithubProfile,
  Strategy,
} from '@md03/passport-github';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Config } from '../../config/config';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: Config) {
    super({
      clientId: config.githubClientId,
      clientSecret: config.githubClientSecret,
    });
  }

  private async getVerifiedEmail(accessToken: string) {
    const emails = await getGithubEmails(accessToken);
    const result = emails.find((item) => item.primary && item.verified);
    if (!result) return;

    return result.email;
  }

  async validate(accessToken: string, profile: GithubProfile) {}
}
