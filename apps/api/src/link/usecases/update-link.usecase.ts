import { LinkRepository } from '@purly/postgres';
import { Usecase } from '../../shared/base.usecase';
import { Injectable } from '@nestjs/common';

interface IUpdateLinkCommand {
  alias: string;
  name?: string;
  url?: string;
}

@Injectable()
export class UpdateLink implements Usecase<IUpdateLinkCommand> {
  constructor(private readonly linkRepository: LinkRepository) {}

  async execute(command: IUpdateLinkCommand) {
    return;
  }
}
