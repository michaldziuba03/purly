import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

const TWENTY_MINUTES = 60 * 20;
const ONE_DAY = 60 * 60 * 24;

export type ResetTokenDoc = HydratedDocument<ResetToken>;

@Schema({ collection: 'reset_tokens' })
export class ResetToken {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  userId: string;

  @Prop({ unique: true })
  token: string;

  @Prop({ expires: TWENTY_MINUTES })
  createdAt: Date;
}

export const ResetTokenSchema = SchemaFactory.createForClass(ResetToken);

export type VerificationTokenDoc = HydratedDocument<VerificationToken>;

@Schema({ collection: 'verification_tokens' })
export class VerificationToken {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  userId: string;

  @Prop({ unique: true })
  token: string;

  @Prop({ expires: ONE_DAY })
  createdAt: Date;
}

export const VerificationTokenSchema =
  SchemaFactory.createForClass(VerificationToken);
