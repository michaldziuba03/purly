import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from '@purly/postgres';
import { Usecase } from '../../shared/base.usecase';

interface IUpdateWorkspaceCommand {
  workspaceId: string;
  userId: string;
  name: string;
  description?: string;
}

@Injectable()
export class UpdateWorkspace implements Usecase<IUpdateWorkspaceCommand> {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async execute(command: IUpdateWorkspaceCommand) {
    const workspace = await this.workspaceRepository.update(
      {
        id: command.workspaceId,
      },
      {
        name: command.name,
        description: command.description,
      }
    );

    return workspace;
  }
}
