import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { BioRepository } from '@purly/database';
import { CreateLink } from '../../link/usecases/create-link.usecase';
import { GetLink } from '../../link/usecases/get-link.usecase';
import { createClientUrl } from '../../shared/utils';

interface IAddElementCommand {
  workspaceId: string;
  label?: string;
  linkId?: string;
  url?: string;
}

@Injectable()
export class AddElement implements Usecase<IAddElementCommand> {
  constructor(
    private readonly bioRepository: BioRepository,
    private readonly createLinkUsecase: CreateLink,
    private readonly getLinkUsecase: GetLink
  ) {}

  async execute(command: IAddElementCommand) {
    if (!command.linkId && !command.url) {
      throw new BadRequestException('Destination URL or linkId is required');
    }

    const link = await this.getLink(command);
    if (!link) {
      throw new NotFoundException('Link with specified linkId not found');
    }

    const element = await this.bioRepository.addElement({
      workspaceId: command.workspaceId,
      label: command.label,
      linkId: link.id,
      redirect: createClientUrl(link.alias), // for now before custom domains support
    });

    return element;
  }

  private getLink(command: IAddElementCommand) {
    // give an option to reuse existing link:
    if (command.linkId) {
      return this.getLinkUsecase.execute({
        linkId: command.linkId,
        workspaceId: command.workspaceId,
      });
    }

    if (command.url) {
      return this.createLinkUsecase.execute({
        url: command.url,
        workspaceId: command.workspaceId,
      });
    }
  }
}
