import { Strategy, GoogleProfile } from '@md03/passport-google';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Config } from '../../config/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: Config) {
    super({
      clientId: config.googleClientId,
    });
  }

  async validate(profile: GoogleProfile) {
    return profile;
  }
}
