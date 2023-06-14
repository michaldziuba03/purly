import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from '../entities/report.entity';

@Injectable()
export class ReportRepository {
  constructor(
    @InjectRepository(Report)
    private readonly reportCtx: Repository<Report>
  ) {}

  create(data: Partial<Report>) {
    const report = this.reportCtx.create(data);
    return this.reportCtx.save(report);
  }
}
