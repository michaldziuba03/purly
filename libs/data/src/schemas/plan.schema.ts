import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum PaymentGateway {
  STRIPE = 'stripe',
}

export type PlanDocument = HydratedDocument<Plan>;

@Schema({ timestamps: true })
export class Plan {
  @Prop({ unique: true })
  name: string;

  @Prop()
  quota: number;

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

  @Prop({ default: PaymentGateway.STRIPE })
  gateway: PaymentGateway;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
