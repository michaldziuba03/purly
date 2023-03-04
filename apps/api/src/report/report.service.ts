import { BadRequestException, Injectable } from '@nestjs/common';
import { ReportRepository } from './report.repository';
import { CreateReportDTO } from './dto/report.dto';
import path from 'path';

@Injectable()
export class ReportService {
  constructor(private readonly reportRepository: ReportRepository) {}

  // TODO: validate hostname
  private getAliasFromUrl(url: string) {
    const { pathname } = new URL(url);
    const parsedPath = path.parse(pathname);

    if (parsedPath.dir !== '/') {
      throw new BadRequestException('Invalid URL pathname');
    }

    return parsedPath.name;
  }

  async reportLink(data: CreateReportDTO) {
    const alias = this.getAliasFromUrl(data.url);
    await this.reportRepository.create({
      alias,
      type: data.type,
      message: data.message,
      absoluteUrl: data.url,
    });
  }
}
