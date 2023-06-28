import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Usecase } from '../../../shared/base.usecase';
import { MemberRepository, Permissions } from '@purly/postgres';

interface IChangePermissionCommand {
  userId: string;
  // permissions of currently authenticated user
  userPermission: Permissions;
  workspaceId: string;
  memberId: string;
  // new permission that current user wants to assign for worksapce member
  memberPermission: Permissions;
}

@Injectable()
export class ChangePermission implements Usecase<IChangePermissionCommand> {
  constructor(private readonly memberRepository: MemberRepository) {}

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

    const member = await this.memberRepository.findMember(
      command.memberId,
      command.workspaceId
    );
    if (!member) {
      throw new NotFoundException('Workspace member not found');
    }

    if (command.userPermission > member.permission) {
      throw new ForbiddenException(
        'You have no permission to assign this new role'
      );
    }

    const isUpdated = await this.memberRepository.changePermission(
      command.memberId,
      command.workspaceId,
      command.memberPermission
    );

    return isUpdated;
  }
}
