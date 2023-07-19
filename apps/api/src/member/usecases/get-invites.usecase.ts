import { Injectable } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { InviteRepository } from '@purly/database';

interface IGetInvitesCommand {
  workspaceId: string;
}

@Injectable()
export class GetInvites implements Usecase<IGetInvitesCommand> {
  constructor(private readonly inviteRepository: InviteRepository) {}

  async execute(command: IGetInvitesCommand) {
    const invites = await this.inviteRepository.findByWorkspaceId(
      command.workspaceId
    );

    return invites;
  }
}
