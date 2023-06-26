import { Injectable } from '@nestjs/common';
import { WorkspaceRepository, MemberRepository } from '@purly/postgres';
import { Usecase } from '../../shared/base.usecase';

interface ICreateWorkspaceCommand {
  userId: string;
  name: string;
  description?: string;
}

@Injectable()
export class CreateWorkspace implements Usecase<ICreateWorkspaceCommand> {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly memberRepository: MemberRepository
  ) {}

  async execute(command: ICreateWorkspaceCommand) {
    const workspace = await this.workspaceRepository.create({
      ownerId: command.userId,
      name: command.name,
      description: command.description,
    });

    await this.memberRepository.createOwner(workspace.id, command.userId);

    return workspace;
  }
}
