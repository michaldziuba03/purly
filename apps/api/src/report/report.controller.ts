import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportLink } from './usecases/report-link.usecase';
import { RecaptchaGuard } from '../shared/recaptcha.guard';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportLinkUsecase: ReportLink) {}

  @Post()
  @UseGuards(RecaptchaGuard)
  reportLink(@Body() body: CreateReportDto) {
    return this.reportLinkUsecase.execute({
      url: body.url,
      message: body.message,
      email: body.email,
      type: body.type,
    });
  }
}
