import { LinkRepository } from '@purly/postgres';
import { Usecase } from '../../shared/base.usecase';
import { Inject, Injectable } from '@nestjs/common';
import { AliasFactory } from '../factories/alias.factory';
import { ALIAS_FACTORY } from '../factories/alias-factory.provider';

interface ICreateLinkCommand {
  userId: string;
  name?: string;
  url: string;
}

@Injectable()
export class CreateLink implements Usecase<ICreateLinkCommand> {
  constructor(
    @Inject(ALIAS_FACTORY)
    private readonly aliasFactory: AliasFactory,
    private readonly linkRepository: LinkRepository
  ) {}

  async execute(command: ICreateLinkCommand) {
    await this.tryToInsert({
      name: command.name,
      userId: command.userId,
      url: command.url,
    });
  }

  async tryToInsert(command: ICreateLinkCommand) {
    const alias = await this.aliasFactory.next();
    const link = await this.linkRepository.create({
      alias,
      isArchived: false,
      name: command.name,
      url: command.url,
      userId: command.userId,
    });

    return link;
  }
}
