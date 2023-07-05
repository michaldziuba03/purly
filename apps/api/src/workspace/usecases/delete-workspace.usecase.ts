import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MemberRepository, WorkspaceRepository } from '@purly/postgres';
import { Usecase } from '../../shared/base.usecase';

interface IDeleteWorkspaceCommand {
  userId: string;
  workspaceId: string;
}

@Injectable()
export class DeleteWorkspace implements Usecase<IDeleteWorkspaceCommand> {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly memberRepository: MemberRepository
  ) {}

  async execute(command: IDeleteWorkspaceCommand) {
    const membersCount = await this.memberRepository.countMembers(
      command.workspaceId,
      2
    );
    if (membersCount > 1) {
      throw new BadRequestException('You cannot delete workspace with members');
    }

    const membersDeleted = await this.memberRepository.deleteAllMembers(
      command.workspaceId
    );
    if (!membersDeleted) {
      throw new Error('Cannot delete all members');
    }

    const isDeleted = await this.workspaceRepository.deleteById(
      command.workspaceId,
      command.userId
    );

    if (!isDeleted) {
      throw new NotFoundException(
        'Workspace not found or you have no permissions to delete'
      );
    }

    return isDeleted && membersDeleted;
  }
}
