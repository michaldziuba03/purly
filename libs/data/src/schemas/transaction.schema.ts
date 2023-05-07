import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ unique: true })
  eventId: string;

  @Prop()
  eventType: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  payload?: object;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
