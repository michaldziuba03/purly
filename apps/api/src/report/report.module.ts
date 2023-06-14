import { Module } from '@nestjs/common';
import { ReportLink } from './usecases/report-link.usecase';
import { ReportController } from './report.controller';

@Module({
  providers: [ReportLink],
  controllers: [ReportController],
})
export class ReportModule {}
