import { Injectable } from '@nestjs/common';
import { BioRepository } from '@purly/database';
import { Usecase } from '../../shared/base.usecase';

interface IUpdateElementCommand {
  workspaceId: string;
  elementId: string;
  label: string;
}

@Injectable()
export class UpdateElement implements Usecase<IUpdateElementCommand> {
  constructor(private readonly bioRepository: BioRepository) {}

  async execute(command: IUpdateElementCommand) {
    const element = await this.bioRepository.updateElement(
      command.elementId,
      command.workspaceId,
      {
        label: command.label,
      }
    );

    return element;
  }
}
