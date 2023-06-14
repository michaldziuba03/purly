import { Injectable } from '@nestjs/common';
import { Providers, UserRepository } from '@purly/postgres';
import { AuthService } from '../auth.service';
import { Usecase } from '../../shared/base.usecase';

interface IOAuth2Command {
  email: string;
  name: string;
  picture?: string;
  provider: Providers;
  subject: string;
}

@Injectable()
export class OAuth2 implements Usecase<IOAuth2Command> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService
  ) {}

  async execute(command: IOAuth2Command): Promise<string> {
    const userId = await this.userRepository.findIdByAccount(
      command.provider,
      command.subject
    );
    if (userId) {
      return userId;
    }

    const user = await this.userRepository.mergeAccount(command.email, {
      provider: command.provider,
      subject: command.subject,
    });
    if (user) {
      return user.id;
    }

    const newUser = await this.userRepository.createWithProvider(
      {
        email: command.email,
        name: command.name,
        picture:
          command.picture || this.authService.createGravatar(command.email),
        isVerified: true,
      },
      {
        provider: command.provider,
        subject: command.subject,
      }
    );

    return newUser.id;
  }
}
