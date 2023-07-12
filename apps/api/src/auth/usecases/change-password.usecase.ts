import { BadRequestException, Injectable } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { UserRepository } from '@purly/database';
import { AuthService } from '../auth.service';
import { isExpired } from '../../shared/utils';

interface IChangePasswordCommand {
  password: string;
  token: string;
}

@Injectable()
export class ChangePassword implements Usecase<IChangePasswordCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService
  ) {}

  async execute(command: IChangePasswordCommand) {
    const tokenHash = this.authService.createSHA256(command.token);
    const metadata = await this.userRepository.getResetToken(tokenHash);
    if (!metadata) {
      throw new BadRequestException('Invalid reset token');
    }

    if (isExpired(metadata.expiresAt)) {
      await this.userRepository.clearResetToken(metadata.userId);
      throw new BadRequestException('Invalid reset token');
    }

    const password = await this.authService.hashPassword(command.password);
    const user = await this.userRepository.updateById(metadata.userId, {
      password,
    });

    await this.userRepository.clearResetToken(metadata.userId);

    return user;
  }
}
