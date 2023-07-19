import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base.repository';
import { InsertReport, Report } from './report.entity';
import { DatabaseContext, InjectDB } from '../database.provider';
import { reports } from './report.schema';

@Injectable()
export class ReportRepository extends BaseRepository<Report> {
  constructor(
    @InjectDB()
    private readonly db: DatabaseContext
  ) {
    super(Report);
  }

  async create(data: InsertReport) {
    const result = await this.db.insert(reports).values(data).returning();

    return this.mapSingle(result);
  }

  async findAll() {
    const result = await this.db.query.reports.findMany({
      limit: 200,
    });

    return this.mapMany(result);
  }
}
