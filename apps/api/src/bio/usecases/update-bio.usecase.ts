import { Injectable } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';

interface IUpdateBioCommand {
  title?: string;
  description?: string;
  userId: string;
}

@Injectable()
export class UpdateBio implements Usecase<IUpdateBioCommand> {
  execute(command: IUpdateBioCommand) {
    return command;
  }
}
