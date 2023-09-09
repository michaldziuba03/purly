import { Injectable, NotFoundException } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { LaunchpadRepository } from '@purly/database';

interface IDeleteElementCommand {
  elementId: string;
  workspaceId: string;
}

@Injectable()
export class DeleteElement implements Usecase<IDeleteElementCommand> {
  constructor(private readonly launchpadRepository: LaunchpadRepository) {}

  async execute(command: IDeleteElementCommand) {
    const isDeleted = await this.launchpadRepository.deleteElement(
      command.elementId,
      command.workspaceId
    );

    if (!isDeleted) {
      throw new NotFoundException('Element not found');
    }

    return isDeleted;
  }
}
