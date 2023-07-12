import { Injectable } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { UserRepository } from '@purly/database';
import { AuthService } from '../auth.service';
import { createClientUrl } from '../../shared/utils';
import { RESET_TOKEN_LIFETIME } from '../auth.constants';

interface IForgotPasswordCommand {
  email: string;
}

@Injectable()
export class ForgotPassword implements Usecase<IForgotPasswordCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService
  ) {}

  async execute(command: IForgotPasswordCommand) {
    const user = await this.userRepository.findByEmail(command.email);
    if (!user) {
      return;
    }

    if (!user.password) {
      return;
    }

    const token = this.authService.generateRandomToken();
    const resetLink = createClientUrl(`/auth/reset/${token}`);

    // TODO: save to database and send notification
    const tokenHash = this.authService.createSHA256(token);
    await this.userRepository.saveResetToken(
      user.id,
      tokenHash,
      RESET_TOKEN_LIFETIME
    );
    console.log(resetLink);
  }
}
