import { ConflictException, Injectable } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import {
  InviteRepository,
  MemberRole,
  UserRepository,
  WorkspaceRepository,
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
    private readonly workspaceRepository: WorkspaceRepository
  ) {}

  async execute(command: IInviteMemberCommand) {
    await this.checkIsMember(command.email, command.workspaceId);

    const inviteToken = await nanoid(24);
    const invite = await this.inviteRepository.create({
      token: inviteToken,
      email: command.email,
      workspaceId: command.workspaceId,
      role: command.role,
      expiresAt: command.expiresAt,
    });

    if (!invite) {
      throw new ConflictException('Email is already invited');
    }

    // TODO: SEND NOTIFICATION WITH INVITE LINK
    console.log('Invite token:', inviteToken);

    return invite;
  }

  private async checkIsMember(email: string, workspaceId: string) {
    const invitee = await this.userRepository.findByEmail(email);
    if (!invitee) {
      return;
    }

    const member = await this.workspaceRepository.findMember(
      workspaceId,
      invitee.id
    );
    if (!member) {
      return;
    }

    throw new ConflictException('Invitee is already workspace member');
  }
}
