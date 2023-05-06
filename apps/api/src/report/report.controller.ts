import { Body, Controller, Post } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportService } from './report.service';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  createReport(@Body() body: CreateReportDto) {
    return this.reportService.createReport(body);
  }
}
