import { Injectable } from '@nestjs/common';
import { UserRepository } from '@purly/database';
import { Usecase } from '../../shared/base.usecase';

interface IUpdateProfileCommand {
  userId: string;
  username?: string;
}

@Injectable()
export class UpdateProfile implements Usecase<IUpdateProfileCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: IUpdateProfileCommand) {
    const user = await this.userRepository.updateById(command.userId, {
      username: command.username,
    });

    return user;
  }
}
