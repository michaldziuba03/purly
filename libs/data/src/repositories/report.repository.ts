import {BaseRepository} from "./base.repository";
import { Report, ReportDocument } from "../schemas/report.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ReportRepository extends BaseRepository<ReportDocument, Report>{
  constructor(
    @InjectModel(Report.name) private readonly reportModel: Model<ReportDocument>,
  ) {
    super(reportModel, Report);
  }
}
