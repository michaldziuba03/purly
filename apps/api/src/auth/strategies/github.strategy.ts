import {
  getGithubEmails,
  GithubProfile,
  Strategy,
} from '@md03/passport-github';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Config } from '../../config/config';
import { AccountService } from '../../account/account.service';
import { OAuthProvider } from '../../account/account.constants';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: Config,
    private readonly accountService: AccountService,
  ) {
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

  async validate(accessToken: string, profile: GithubProfile) {
    const subject = profile.id.toString();
    const connectedUser = await this.accountService.findByFederatedAccount(
      OAuthProvider.GITHUB,
      subject,
    );
    if (connectedUser) {
      return connectedUser;
    }

    const email = await this.getVerifiedEmail(accessToken);
    if (!email) {
      throw new BadRequestException('GitHub email must be verified');
    }

    const user = await this.accountService.connectFederatedAccount(
      OAuthProvider.GITHUB,
      subject,
      {
        name: profile.name,
        email,
        picture: profile.avatarUrl,
      },
    );

    if (!user) {
      throw new BadRequestException(
        'GitHub cannot be linked to unverified account',
      );
    }

    return user;
  }
}
