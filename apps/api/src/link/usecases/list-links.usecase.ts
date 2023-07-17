import { LinkRepository } from '@purly/database';
import { Usecase } from '../../shared/base.usecase';
import { Injectable } from '@nestjs/common';

interface IListLinksCommand {
  workspaceId: string;
}

@Injectable()
export class ListLinks implements Usecase<IListLinksCommand> {
  constructor(private readonly linkRepository: LinkRepository) {}

  async execute(command: IListLinksCommand) {
    // TODO: implement pagination and sorting
    const links = await this.linkRepository.findByWorkspace(
      command.workspaceId
    );
    return links;
  }
}
