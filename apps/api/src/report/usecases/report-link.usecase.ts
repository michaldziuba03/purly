import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { parse as parsePath } from 'path';
import { LinkRepository, ReportRepository } from '@purly/postgres';

interface IReportLinkCommand {
  url: string;
  message?: string;
}

@Injectable()
export class ReportLink implements Usecase<IReportLinkCommand> {
  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly linkRepository: LinkRepository
  ) {}

  async execute(command: IReportLinkCommand) {
    const alias = this.getAliasFromUrl(command.url);
    const link = await this.linkRepository.findByAlias(alias);
    if (!link) {
      throw new NotFoundException('Link not found');
    }

    const report = await this.reportRepository.create({
      alias,
      message: command.message,
      url: command.url,
      destinationUrl: link.url,
      solved: false,
    });

    return report;
  }

  private getAliasFromUrl(url: string) {
    const { pathname } = new URL(url);
    const parsedPath = parsePath(pathname);

    if (parsedPath.dir !== '/') {
      throw new BadRequestException('Invalid URL pathname');
    }

    return parsedPath.name;
  }
}
