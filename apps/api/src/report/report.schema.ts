import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReportDocument = HydratedDocument<Report>;

export enum MaliciousType {
  CSM = 'csm',
  MALWARE = 'malware',
  SCAM = 'scam',
}

@Schema({ timestamps: true })
export class Report {
  @Prop()
  alias: string;

  @Prop()
  absoluteUrl: string;

  @Prop()
  message: string;

  @Prop()
  type: MaliciousType;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
