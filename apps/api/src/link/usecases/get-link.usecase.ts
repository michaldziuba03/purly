import { LinkRepository } from '@purly/postgres';
import { Usecase } from '../../shared/base.usecase';
import { Injectable } from '@nestjs/common';

interface IGetLinkCommand {
  alias: string;
}

@Injectable()
export class GetLink implements Usecase<IGetLinkCommand> {
  constructor(private readonly linkRepository: LinkRepository) {}

  async execute(command: IGetLinkCommand) {
    return this.linkRepository.findByAlias(command.alias);
  }
}
