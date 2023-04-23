import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectIdProp } from "../decorators";

const TWENTY_MINUTES = 60 * 20;

export type ResetTokenDocument = HydratedDocument<ResetToken>;

@Schema({ collection: 'reset_tokens' })
export class ResetToken {
  @ObjectIdProp()
  userId: string;

  @Prop({ unique: true })
  token: string;

  @Prop({ expires: TWENTY_MINUTES })
  createdAt: Date;
}

export const ResetTokenSchema = SchemaFactory.createForClass(ResetToken);
