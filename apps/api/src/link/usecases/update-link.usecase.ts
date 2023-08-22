import { LinkRepository } from '@purly/database';
import { Usecase } from '../../shared/base.usecase';
import { Injectable } from '@nestjs/common';

interface IUpdateLinkCommand {
  linkId: string;
  workspaceId: string;
  name?: string;
  expiresAt?: string;
  url?: string;
  isActive?: boolean;
  androidRedirect?: string;
  iosRedirect?: string;
}

@Injectable()
export class UpdateLink implements Usecase<IUpdateLinkCommand> {
  constructor(private readonly linkRepository: LinkRepository) {}

  async execute(command: IUpdateLinkCommand) {
    return this.linkRepository.update(command.linkId, command.workspaceId, {
      url: command.url,
      name: command.name,
      expiresAt: command.expiresAt ? new Date(command.expiresAt) : undefined,
      isActive: command.isActive,
      androidRedirect: command.androidRedirect,
      iosRedirect: command.iosRedirect,
    });
  }
}
