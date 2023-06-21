import { Injectable } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';

interface IAddButtonCommand {
  label: string;
  url: string;
}

@Injectable()
export class AddButton implements Usecase<IAddButtonCommand> {
  execute(command: IAddButtonCommand) {
    return command;
  }
}
