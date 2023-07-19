import { Injectable } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { InviteRepository } from '@purly/database';

interface IDeleteInviteCommand {
  email: string;
  workspaceId: string;
}

@Injectable()
export class DeleteInvite implements Usecase<IDeleteInviteCommand> {
  constructor(private readonly inviteRepository: InviteRepository) {}

  async execute(command: IDeleteInviteCommand) {
    const isDeleted = await this.inviteRepository.delete(
      command.email,
      command.workspaceId
    );

    return isDeleted;
  }
}
