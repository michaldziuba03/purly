import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '@purly/postgres';
import { AuthService } from '../auth.service';

interface LoginCommand {
  email: string;
  password: string;
}

@Injectable()
export class Login {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService
  ) {}

  async execute(command: LoginCommand) {
    const user = await this.userRepository.findByEmail(command.email);
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    if (!user.password) {
      throw new BadRequestException('Use social login provider');
    }

    const isMatching = await this.authService.verifyPassword(
      user.password,
      command.password
    );
    if (!isMatching) {
      throw new BadRequestException('Invalid email or password');
    }

    return user;
  }
}
