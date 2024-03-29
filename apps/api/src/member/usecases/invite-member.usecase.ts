import { ConflictException, Injectable } from '@nestjs/common';
import { MemberRole } from '@purly/shared';
import { MailsProducer } from '@purly/queue';
import { Usecase } from '../../shared/base.usecase';
import {
  InviteRepository,
  MemberRepository,
  UserRepository,
} from '@purly/database';
import { nanoid } from 'nanoid/async';

interface IInviteMemberCommand {
  workspaceId: string;
  userId: string;
  email: string;
  role: MemberRole;
  expiresAt?: Date;
}

@Injectable()
export class InviteMember implements Usecase<IInviteMemberCommand> {
  constructor(
    private readonly inviteRepository: InviteRepository,
    private readonly userRepository: UserRepository,
    private readonly memberRepository: MemberRepository,
    private readonly mailsProducer: MailsProducer
  ) {}

  async execute(command: IInviteMemberCommand) {
    await this.checkIsMember(command.email, command.workspaceId);

    const inviteToken = await nanoid(32);
    const invite = await this.inviteRepository.create({
      token: inviteToken,
      email: command.email,
      workspaceId: command.workspaceId,
      role: command.role,
      expiresAt: command.expiresAt,
    });

    if (!invite) {
      throw new ConflictException('User is already invited');
    }

    await this.mailsProducer.sendInvite({
      email: invite.email,
      workspaceId: command.workspaceId,
      token: inviteToken,
    });

    return invite;
  }

  private async checkIsMember(email: string, workspaceId: string) {
    const invitee = await this.userRepository.findByEmail(email);
    if (!invitee) {
      return;
    }

    const member = await this.memberRepository.findMember(
      workspaceId,
      invitee.id
    );
    if (!member) {
      return;
    }

    throw new ConflictException('Invitee is already workspace member');
  }
}
