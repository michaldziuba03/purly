import { LinkRepository } from '@purly/postgres';
import { Usecase } from '../../shared/base.usecase';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { AliasFactory } from '../factories/alias.factory';
import { ALIAS_FACTORY } from '../factories/alias-factory.provider';
import retry from 'async-retry';
import { UtmParamsDto } from '../dto/utm-params.dto';

interface ICreateLinkCommand extends UtmParamsDto {
  userId: string;
  name?: string;
  url: string;
  androidRedirect?: string;
  iosRedirect?: string;
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
      userId: command.userId,
      url: command.url,
      enableUtm: command.enableUtm,
      utmCampaign: command.utmCampaign,
      utmContent: command.utmContent,
      utmMedium: command.utmMedium,
      utmSource: command.utmSource,
      utmTerm: command.utmTerm,
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
          if (this.linkRepository.isDuplicatedAliasError(err)) {
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
