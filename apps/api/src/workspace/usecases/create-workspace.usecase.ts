import { BadRequestException, Injectable } from '@nestjs/common';
import { WorkspaceRepository, MemberRole } from '@purly/database';
import { Usecase } from '../../shared/base.usecase';
import { WORKSPACES_LIMIT } from '../workspace.constants';

interface ICreateWorkspaceCommand {
  userId: string;
  name: string;
  description?: string;
}

@Injectable()
export class CreateWorkspace implements Usecase<ICreateWorkspaceCommand> {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async execute(command: ICreateWorkspaceCommand) {
    const workspacesCount = await this.workspaceRepository.countByMemberId(
      command.userId,
      WORKSPACES_LIMIT
    );
    if (workspacesCount >= WORKSPACES_LIMIT) {
      throw new BadRequestException('You hit the limit of workspaces');
    }

    const workspace = await this.workspaceRepository.create({
      name: command.name,
    });

    await this.workspaceRepository.addMember(
      workspace.id,
      command.userId,
      MemberRole.OWNER
    );

    return workspace;
  }
}
