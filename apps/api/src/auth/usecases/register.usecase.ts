import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '@purly/postgres';
import { AuthService } from '../auth.service';

interface RegisterCommand {
  email: string;
  name: string;
  password: string;
}

@Injectable()
export class Register {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService
  ) {}

  async execute(command: RegisterCommand) {
    const userExists = await this.userRepository.existsByEmail(command.email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const picture = this.authService.createGravatar(command.email);
    const passwordHash = await this.authService.hashPassword(command.password);

    const user = await this.userRepository.create({
      email: command.email,
      name: command.name,
      picture,
      password: passwordHash,
      isVerified: false,
    });

    return user;
  }
}
