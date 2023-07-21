import { Injectable } from '@nestjs/common';
import { OAuthProviders } from '@purly/shared';
import { UserRepository } from '@purly/database';
import { AuthService } from '../auth.service';
import { Usecase } from '../../shared/base.usecase';

interface IOAuth2Command {
  email: string;
  username: string;
  picture?: string;
  providerName: OAuthProviders;
  providerId: string;
}

@Injectable()
export class OAuth2 implements Usecase<IOAuth2Command> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService
  ) {}

  async execute(command: IOAuth2Command): Promise<string> {
    const userId = await this.userRepository.findIdByOAuth(
      command.providerName,
      command.providerId
    );
    if (userId) {
      return userId;
    }

    const user = await this.userRepository.findByEmail(command.email);
    if (user) {
      await this.userRepository.connectOAuth(
        user.id,
        command.providerName,
        command.providerId
      );

      return user.id;
    }

    const newUser = await this.userRepository.createWithOAuth(
      {
        email: command.email,
        username: command.username,
        picture:
          command.picture || this.authService.createGravatar(command.email),
      },
      command.providerName,
      command.providerId
    );

    return newUser.id;
  }
}
