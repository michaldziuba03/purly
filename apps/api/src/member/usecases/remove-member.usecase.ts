import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MemberRole } from '@purly/shared';
import { Usecase } from '../../shared/base.usecase';
import { MemberRepository } from '@purly/database';

interface IRemoveMemberCommand {
  userId: string;
  userRole: MemberRole;
  memberId: string;
  workspaceId: string;
}

@Injectable()
export class RemoveMember implements Usecase<IRemoveMemberCommand> {
  constructor(private readonly memberRepository: MemberRepository) {}

  async execute(command: IRemoveMemberCommand) {
    if (command.memberId === command.userId) {
      throw new ForbiddenException('You cannot remove yourself from workspace');
    }

    const member = await this.memberRepository.findMember(
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

    const isRemoved = await this.memberRepository.removeMember(
      command.workspaceId,
      command.memberId
    );

    return isRemoved;
  }
}
