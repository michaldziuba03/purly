import { Injectable } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { UserRepository } from '@purly/database';
import { AuthService } from '../auth.service';
import { createClientUrl } from '../../shared/utils';
import { RESET_TOKEN_LIFETIME } from '../auth.constants';
import { BrokerProducer } from '../../shared/broker.producer';

interface IForgotPasswordCommand {
  email: string;
}

@Injectable()
export class ForgotPassword implements Usecase<IForgotPasswordCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly brokerProducer: BrokerProducer
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

    const tokenHash = this.authService.createSHA256(token);
    await this.userRepository.saveResetToken(
      user.id,
      tokenHash,
      RESET_TOKEN_LIFETIME
    );

    this.brokerProducer.emit('user.password.reset', {
      resetLink,
      ...user,
    });
  }
}
