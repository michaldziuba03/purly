import { Strategy, GithubProfile } from '@md03/passport-github';
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

  async validate(profile: GithubProfile) {
    return profile;
  }
}
