import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { normalizer } from '../database/normalize';
import mongoose, { HydratedDocument } from 'mongoose';

export type StripeEventDocument = HydratedDocument<StripeEvent>;

@Schema({ timestamps: true, collection: 'stripe_events' })
export class StripeEvent {
  @Prop({ unique: true })
  eventId: string;

  @Prop()
  eventType: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  payload?: object;
}

export const StripeEventSchema = SchemaFactory.createForClass(StripeEvent);
StripeEventSchema.plugin(normalizer);
