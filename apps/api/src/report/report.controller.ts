import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDTO } from './dto/report.dto';
import { RecaptchaGuard } from '../common/guards/recaptcha.guard';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @UseGuards(RecaptchaGuard)
  async createReport(@Body() data: CreateReportDTO) {
    await this.reportService.reportLink(data);
  }
}
