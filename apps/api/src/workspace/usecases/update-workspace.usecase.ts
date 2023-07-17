import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from '@purly/database';
import { Usecase } from '../../shared/base.usecase';

interface IUpdateWorkspaceCommand {
  workspaceId: string;
  userId: string;
  name: string;
}

@Injectable()
export class UpdateWorkspace implements Usecase<IUpdateWorkspaceCommand> {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async execute(command: IUpdateWorkspaceCommand) {
    const workspace = await this.workspaceRepository.updateById(
      command.workspaceId,
      {
        name: command.name,
        updatedAt: new Date(),
      }
    );

    return workspace;
  }
}
