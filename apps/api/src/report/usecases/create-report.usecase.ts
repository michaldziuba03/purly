import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { parse as parsePath } from 'path';
import { AbuseType, LinkRepository, ReportRepository } from '@purly/database';
import { MailsProducer } from '@purly/queue';

interface ICreateReportCommand {
  url: string;
  email: string;
  type: AbuseType;
  message?: string;
}

@Injectable()
export class CreateReport implements Usecase<ICreateReportCommand> {
  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly linkRepository: LinkRepository,
    private readonly mailsProducer: MailsProducer
  ) {}

  async execute(command: ICreateReportCommand) {
    const alias = this.getAliasFromUrl(command.url);
    const link = await this.linkRepository.findOneByAlias(alias);
    if (!link) {
      throw new NotFoundException('Link not found');
    }

    const report = await this.reportRepository.create({
      alias,
      linkId: link.id,
      message: command.message,
      url: command.url,
      destination: link.url,
      isSolved: false,
      email: command.email,
      type: command.type,
    });

    await this.mailsProducer.sendReport({
      destinationUrl: report.destination,
      email: process.env.REPORT_MAIL,
      linkId: report.linkId,
      // add more details
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
