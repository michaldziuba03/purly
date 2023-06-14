import { Injectable } from '@nestjs/common';
import { UserRepository } from '@purly/postgres';
import { Usecase } from '../../shared/base.usecase';

interface IUpdateProfileCommand {
  userId: string;
  name?: string;
}

@Injectable()
export class UpdateProfile implements Usecase<IUpdateProfileCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: IUpdateProfileCommand) {
    const success = await this.userRepository.update(
      {
        id: command.userId,
      },
      {
        name: command.name,
      }
    );

    return success;
  }
}
