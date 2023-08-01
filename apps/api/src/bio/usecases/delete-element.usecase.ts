import { Injectable, NotFoundException } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { BioRepository } from '@purly/database';

interface IDeleteElementCommand {
  elementId: string;
  workspaceId: string;
}

@Injectable()
export class DeleteElement implements Usecase<IDeleteElementCommand> {
  constructor(private readonly bioRepository: BioRepository) {}

  async execute(command: IDeleteElementCommand) {
    const isDeleted = await this.bioRepository.deleteElement(
      command.elementId,
      command.workspaceId
    );

    if (!isDeleted) {
      throw new NotFoundException('Element not found');
    }

    return isDeleted;
  }
}
