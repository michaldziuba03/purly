import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { WorkspaceRepository, MemberRole } from '@purly/database';

interface IRemoveMemberCommand {
  userId: string;
  userRole: MemberRole;
  memberId: string;
  workspaceId: string;
}

@Injectable()
export class RemoveMember implements Usecase<IRemoveMemberCommand> {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async execute(command: IRemoveMemberCommand) {
    if (command.memberId === command.userId) {
      throw new ForbiddenException('You cannot remove yourself from workspace');
    }

    const member = await this.workspaceRepository.findMember(
      command.memberId,
      command.workspaceId
    );

    if (!member) {
      throw new NotFoundException('Workspace member not found');
    }

    if (command.userRole >= member.role) {
      throw new ForbiddenException(
        'You have no permission to remove this workspace member'
      );
    }

    const isRemoved = await this.workspaceRepository.removeMember(
      command.workspaceId,
      command.memberId
    );

    return isRemoved;
  }
}
