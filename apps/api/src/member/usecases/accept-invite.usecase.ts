import { Injectable, NotFoundException } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import {
  InviteRepository,
  UserRepository,
  WorkspaceRepository,
} from '@purly/database';

interface IAcceptInviteCommand {
  userId: string;
  inviteToken: string;
}

@Injectable()
export class AcceptInvite implements Usecase<IAcceptInviteCommand> {
  constructor(
    private readonly inviteRepository: InviteRepository,
    private readonly userRepository: UserRepository,
    private readonly workspaceRepository: WorkspaceRepository
  ) {}

  async execute(command: IAcceptInviteCommand) {
    const invite = await this.inviteRepository.findById(command.inviteToken);
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

    const isAdded = await this.workspaceRepository.addMember(
      invite.workspaceId,
      user.id,
      invite.role
    );

    if (isAdded) {
      await this.inviteRepository.delete(command.inviteToken);
    }

    return isAdded;
  }
}
