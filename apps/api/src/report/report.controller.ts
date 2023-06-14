import { Body, Controller, Post } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportLink } from './usecases/report-link.usecase';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportLinkUsecase: ReportLink) {}

  @Post()
  reportLink(@Body() body: CreateReportDto) {
    return this.reportLinkUsecase.execute({
      url: body.url,
      message: body.message,
    });
  }
}
