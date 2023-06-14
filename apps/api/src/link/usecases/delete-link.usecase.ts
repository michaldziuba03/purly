import { LinkRepository } from '@purly/postgres';
import { Usecase } from '../../shared/base.usecase';
import { Injectable } from '@nestjs/common';

interface IDeleteLinkCommand {
  alias: string;
  userId: string;
}

@Injectable()
export class DeleteLink implements Usecase<IDeleteLinkCommand> {
  constructor(private readonly linkRepository: LinkRepository) {}

  async execute(command: IDeleteLinkCommand) {
    return this.linkRepository.delete(command.alias, command.userId);
  }
}
