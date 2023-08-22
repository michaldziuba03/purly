import { LinkRepository, isDuplicatedError } from '@purly/database';
import { Usecase } from '../../shared/base.usecase';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { AliasFactory } from '../factories/alias.factory';
import { ALIAS_FACTORY } from '../factories/alias.provider';
import retry from 'async-retry';

interface ICreateLinkCommand {
  workspaceId: string;
  name?: string;
  expiresAt?: string;
  isActive?: boolean;
  url: string;
  androidRedirect?: string;
  iosRedirect?: string;
  isButton?: boolean;
}

@Injectable()
export class CreateLink implements Usecase<ICreateLinkCommand> {
  constructor(
    @Inject(ALIAS_FACTORY)
    private readonly aliasFactory: AliasFactory,
    private readonly linkRepository: LinkRepository
  ) {}

  private async createLink(command: ICreateLinkCommand) {
    const alias = await this.aliasFactory.create();
    const link = await this.linkRepository.create({
      alias,
      name: command.name,
      expiresAt: command.expiresAt ? new Date(command.expiresAt) : undefined,
      workspaceId: command.workspaceId,
      url: command.url,
      isActive: command.isActive,
      androidRedirect: command.androidRedirect,
      iosRedirect: command.iosRedirect,
    });

    return link;
  }

  async execute(command: ICreateLinkCommand) {
    return retry(
      async (bail) => {
        try {
          return await this.createLink(command);
        } catch (err) {
          if (isDuplicatedError('alias', err)) {
            Logger.warn('Duplicated alias detected, retrying...');
            throw err;
          }

          bail(err);
        }
      },
      {
        retries: 30,
        factor: 0,
      }
    );
  }
}
