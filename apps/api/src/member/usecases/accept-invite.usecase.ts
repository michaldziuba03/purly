import { Injectable, NotFoundException } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import {
  Invite,
  InviteRepository,
  MemberRepository,
  UserRepository,
} from '@purly/database';
import { isExpired } from '../../shared/utils';

interface IAcceptInviteCommand {
  userId: string;
  inviteToken: string;
}

@Injectable()
export class AcceptInvite implements Usecase<IAcceptInviteCommand> {
  constructor(
    private readonly inviteRepository: InviteRepository,
    private readonly userRepository: UserRepository,
    private readonly memberRepository: MemberRepository
  ) {}

  async execute(command: IAcceptInviteCommand) {
    const invite = await this.inviteRepository.findByToken(command.inviteToken);
    if (!invite) {
      throw new NotFoundException('Invite not found');
    }

    const user = await this.userRepository.findById(command.userId);
    if (!user) {
      throw new Error('Something went wrong');
    }

    if (invite.email !== user.email) {
      throw new NotFoundException('Invite not found');
    }

    if (invite.expiresAt && isExpired(invite.expiresAt)) {
      await this.clearInvite(invite);
      throw new NotFoundException('Invite not found');
    }

    const isAdded = await this.memberRepository.addMember(
      invite.workspaceId,
      user.id,
      invite.role
    );

    if (isAdded) {
      await this.clearInvite(invite);
    }

    return isAdded;
  }

  private clearInvite(invite: Invite) {
    return this.inviteRepository.delete(invite.email, invite.workspaceId);
  }
}
