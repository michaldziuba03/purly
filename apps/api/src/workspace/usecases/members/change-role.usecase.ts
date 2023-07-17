import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Usecase } from '../../../shared/base.usecase';
import { WorkspaceRepository, MemberRole } from '@purly/database';

interface IChangePermissionCommand {
  userId: string;
  // permissions of currently authenticated user
  userPermission: MemberRole;
  workspaceId: string;
  memberId: string;
  // new permission that current user wants to assign for workspace member
  memberPermission: MemberRole;
}

@Injectable()
export class ChangePermission implements Usecase<IChangePermissionCommand> {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async execute(command: IChangePermissionCommand) {
    if (command.memberId === command.userId) {
      throw new ForbiddenException(
        'You cannot change permissions for yourself'
      );
    }

    if (command.userPermission > command.memberPermission) {
      throw new ForbiddenException(
        'You have no permission to assign this new role'
      );
    }

    const member = await this.workspaceRepository.findMember(
      command.memberId,
      command.workspaceId
    );

    if (!member) {
      throw new NotFoundException('Workspace member not found');
    }

    if (command.userPermission > member.role) {
      throw new ForbiddenException(
        'You have no permission to assign this new role'
      );
    }

    const isUpdated = await this.workspaceRepository.changeMemberRole(
      command.memberId,
      command.workspaceId,
      command.memberPermission
    );

    return isUpdated;
  }
}
