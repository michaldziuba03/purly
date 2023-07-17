import { LinkRepository } from '@purly/database';
import { Usecase } from '../../shared/base.usecase';
import { Injectable } from '@nestjs/common';

interface IDeleteLinkCommand {
  linkId: string;
  workspaceId: string;
}

@Injectable()
export class DeleteLink implements Usecase<IDeleteLinkCommand> {
  constructor(private readonly linkRepository: LinkRepository) {}

  async execute(command: IDeleteLinkCommand) {
    return this.linkRepository.delete(command.linkId, command.workspaceId);
  }
}
