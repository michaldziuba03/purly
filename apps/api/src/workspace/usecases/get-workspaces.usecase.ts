import { Injectable } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { WorkspaceRepository } from '@purly/database';
import { WORKSPACES_LIMIT } from '@purly/shared';

interface IGetWorkspacesCommand {
  userId: string;
}

@Injectable()
export class GetWorkspaces implements Usecase<IGetWorkspacesCommand> {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  execute(command: IGetWorkspacesCommand) {
    return this.workspaceRepository.findByMember(
      command.userId,
      WORKSPACES_LIMIT
    );
  }
}
