import { GoogleProfile, Strategy } from '@md03/passport-google';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Config } from '../../config/config';
import { OAuthProvider } from '../../account/account.constants';
import { AccountService } from '../../account/account.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: Config,
    private readonly accountService: AccountService,
  ) {
    super({
      clientId: config.googleClientId,
    });
  }

  async validate(profile: GoogleProfile) {
    const connectedUser = await this.accountService.findByFederatedAccount(
      OAuthProvider.GOOGLE,
      profile.sub,
    );
    if (connectedUser) {
      return connectedUser;
    }

    if (!profile['email_verified']) {
      throw new BadRequestException('Google email must be verified');
    }

    const user = await this.accountService.connectFederatedAccount(
      OAuthProvider.GOOGLE,
      profile.sub,
      {
        email: profile.email,
        picture: profile.picture,
        name: profile.name,
      },
    );

    if (!user) {
      throw new BadRequestException(
        'Google cannot be linked to unverified account',
      );
    }

    return user;
  }
}
