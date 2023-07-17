import { LinkRepository } from '@purly/database';
import { Usecase } from '../../shared/base.usecase';
import { Injectable } from '@nestjs/common';

interface IGetLinkCommand {
  linkId: string;
  workspaceId: string;
}

@Injectable()
export class GetLink implements Usecase<IGetLinkCommand> {
  constructor(private readonly linkRepository: LinkRepository) {}

  execute(command: IGetLinkCommand) {
    return this.linkRepository.findOne(command.linkId, command.workspaceId);
  }
}
