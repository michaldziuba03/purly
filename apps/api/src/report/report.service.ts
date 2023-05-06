import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LinkRepository, ReportRepository } from '@libs/data';
import path from 'path';
import { CreateReportDto } from './dto/create-report.dto';
import { QueueService } from '../shared/queue.service';
import { Config } from '../config/config';

@Injectable()
export class ReportService {
  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly linkRepository: LinkRepository,
    private readonly queueService: QueueService,
    private readonly config: Config,
  ) {}

  // TODO: validate hostname
  private getAliasFromUrl(url: string) {
    const { pathname } = new URL(url);
    const parsedPath = path.parse(pathname);

    if (parsedPath.dir !== '/') {
      throw new BadRequestException('Invalid URL pathname');
    }

    return parsedPath.name;
  }

  async createReport(data: CreateReportDto) {
    const alias = this.getAliasFromUrl(data.url);
    const linkExists = await this.linkRepository.exists({ alias });
    if (!linkExists) {
      throw new NotFoundException();
    }

    const report = await this.reportRepository.create({
      alias,
      message: data.message,
      type: data.type,
      url: data.url,
    });

    if (this.config.emailReport) {
      await this.queueService.sendReportEmail({
        email: this.config.emailReport,
        message: data.message,
        type: data.type,
        alias,
        url: data.url,
        reportId: report.id,
      });
    }

    return report;
  }
}
