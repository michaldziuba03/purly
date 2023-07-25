import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MemberRole } from '@purly/shared';
import { Usecase } from '../../shared/base.usecase';
import { MemberRepository } from '@purly/database';

interface IChangeRoleCommand {
  userId: string;
  workspaceId: string;
  // permissions of currently authenticated user
  userRole: MemberRole;
  memberId: string;
  // new permission that current user wants to assign for workspace member
  newRole: MemberRole;
}

@Injectable()
export class ChangeRole implements Usecase<IChangeRoleCommand> {
  constructor(private readonly memberRepository: MemberRepository) {}

  async execute(command: IChangeRoleCommand) {
    if (command.memberId === command.userId) {
      throw new ForbiddenException(
        'You cannot change permissions for yourself'
      );
    }

    if (command.userRole > command.newRole) {
      throw new ForbiddenException(
        'You have no permission to assign this new role'
      );
    }

    const member = await this.memberRepository.findMember(
      command.memberId,
      command.workspaceId
    );

    if (!member) {
      throw new NotFoundException('Workspace member not found');
    }

    if (command.userRole > member.role) {
      throw new ForbiddenException(
        'You have no permission to assign this new role'
      );
    }

    const isUpdated = await this.memberRepository.changeMemberRole(
      command.memberId,
      command.workspaceId,
      command.newRole
    );

    return isUpdated;
  }
}
