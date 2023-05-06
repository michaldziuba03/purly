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
  id: string;

  @Prop()
  alias: string;

  @Prop()
  url: string;

  @Prop()
  message: string;

  @Prop()
  type: MaliciousType;

  @Prop({ default: false })
  solved: boolean;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
