import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '@purly/database';
import { AuthService } from '../auth.service';
import { Usecase } from '../../shared/base.usecase';
import { BrokerProducer } from '../../shared/broker.producer';
import { MailsProducer } from '@purly/queue';

interface IRegisterCommand {
  email: string;
  username: string;
  password: string;
}

@Injectable()
export class Register implements Usecase<IRegisterCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly mailsProducer: MailsProducer
  ) {}

  async execute(command: IRegisterCommand) {
    const userExists = await this.userRepository.existsByEmail(command.email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const picture = this.authService.createGravatar(command.email);
    const passwordHash = await this.authService.hashPassword(command.password);

    const user = await this.userRepository.create({
      email: command.email,
      username: command.username,
      picture,
      password: passwordHash,
    });

    this.mailsProducer.sendResetPasswordLink({
      email: user.email,
      username: user.username,
      resetLink: 'NOT_IMPLEMENTED',
    });

    return user;
  }
}
