import { Module } from '@nestjs/common';
import { CreateReport } from './usecases/create-report.usecase';
import { ReportController } from './report.controller';

@Module({
  providers: [CreateReport],
  controllers: [ReportController],
})
export class ReportModule {}
