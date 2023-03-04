import { EntityRepository } from '../database/entity.repository';
import { Report, ReportDocument } from './report.schema';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReportRepository extends EntityRepository<ReportDocument> {
  constructor(
    @InjectModel(Report.name)
    private readonly reportModel: Model<ReportDocument>,
  ) {
    super(reportModel);
  }
}
