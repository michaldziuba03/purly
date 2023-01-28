import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { normalizer } from '../database/normalize';

export enum Plans {
  BASIC = 'basic',
  PRO = 'pro',
}

export type PlanDocument = HydratedDocument<Plan>;

@Schema({ timestamps: true })
export class Plan {
  @Prop({ unique: true })
  name: Plans;

  @Prop()
  displayName: string;

  @Prop()
  description: string;

  @Prop({ unique: true })
  productId: string;

  @Prop({ unique: true })
  priceId: string;

  @Prop()
  price: number;

  @Prop()
  currency: string;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
PlanSchema.plugin(normalizer);
