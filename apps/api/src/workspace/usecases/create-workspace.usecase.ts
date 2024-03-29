import { BadRequestException, Injectable } from '@nestjs/common';
import { MemberRole } from '@purly/shared';
import { MemberRepository, WorkspaceRepository } from '@purly/database';
import { Usecase } from '../../shared/base.usecase';
import { WORKSPACES_LIMIT } from '@purly/shared';

interface ICreateWorkspaceCommand {
  userId: string;
  name: string;
  slug: string;
  description?: string;
}

@Injectable()
export class CreateWorkspace implements Usecase<ICreateWorkspaceCommand> {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly memberRepository: MemberRepository
  ) {}

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
      slug: command.slug,
    });

    await this.memberRepository.addMember(
      workspace.id,
      command.userId,
      MemberRole.OWNER
    );

    return workspace;
  }
}
