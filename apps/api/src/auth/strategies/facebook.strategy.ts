import { PassportStrategy } from '@nestjs/passport';
import { Strategy, FacebookProfile } from '@md03/passport-facebook';
import { Injectable } from '@nestjs/common';
import { Config } from '../../config/config';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: Config) {
    super();
  }

  async validate(profile: FacebookProfile) {
    return profile;
  }
}
