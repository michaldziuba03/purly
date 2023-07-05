import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Usecase } from '../../../shared/base.usecase';
import { MemberRepository, Permissions } from '@purly/postgres';

interface IBanMemberCommand {
  userId: string;
  userPermission: Permissions;
  workspaceId: string;
  memberId: string;
}

@Injectable()
export class BanMember implements Usecase<IBanMemberCommand> {
  constructor(private readonly memberRepository: MemberRepository) {}

  async execute(command: IBanMemberCommand) {
    if (command.memberId === command.userId) {
      throw new ForbiddenException('You cannot ban yourself');
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
        'You have no permissions to ban this member'
      );
    }

    const isBanned = await this.memberRepository.banMember(
      command.memberId,
      command.workspaceId
    );

    return isBanned;
  }
}
