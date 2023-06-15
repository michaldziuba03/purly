import { LinkRepository } from '@purly/postgres';
import { Usecase } from '../../shared/base.usecase';
import { Injectable } from '@nestjs/common';

interface IGetLinksListCommand {
  userId: string;
}

@Injectable()
export class GetLinksList implements Usecase<IGetLinksListCommand> {
  constructor(private readonly linkRepository: LinkRepository) {}

  async execute(command: IGetLinksListCommand) {
    // TODO: implement pagination and sorting
    const links = await this.linkRepository.findAll(command.userId);
    return links;
  }
}
