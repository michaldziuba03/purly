import { Injectable } from '@nestjs/common';
import { UserRepository } from '@purly/postgres';
import { Usecase } from '../../shared/base.usecase';

interface IGetProfileCommand {
  userId: string;
}

@Injectable()
export class GetProfile implements Usecase<IGetProfileCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  execute(command: IGetProfileCommand) {
    return this.userRepository.findById(command.userId);
  }
}
