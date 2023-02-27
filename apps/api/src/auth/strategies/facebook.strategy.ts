import { PassportStrategy } from '@nestjs/passport';
import { FacebookProfile, Strategy } from '@md03/passport-facebook';
import { Config } from '../../config/config';
import { AccountService } from '../../account/account.service';
import { OAuthProvider } from '../../account/account.constants';
import { BadRequestException } from '@nestjs/common';

export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: Config,
    private readonly accountService: AccountService,
  ) {
    super();
  }

  async validate(accessToken: string, profile: FacebookProfile) {
    const connectedUser = await this.accountService.findByFederatedAccount(
      OAuthProvider.FACEBOOK,
      profile.id,
    );
    if (connectedUser) {
      return connectedUser;
    }

    if (!profile.email) {
      throw new BadRequestException('Verified Facebook email is required');
    }

    const user = await this.accountService.connectFederatedAccount(
      OAuthProvider.FACEBOOK,
      profile.id,
      {
        email: profile.email,
        picture: profile.picture,
        name: profile.name,
      },
    );

    if (!user) {
      throw new BadRequestException(
        'Facebook cannot be linked to unverified account',
      );
    }

    return user;
  }
}
