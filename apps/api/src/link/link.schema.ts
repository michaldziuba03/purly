import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type LinkDocument = HydratedDocument<Link>;

@Schema({
  timestamps: true,
})
export class Link {
  @Prop({ unique: true })
  alias: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  userId: string;

  @Prop()
  sequence: number; // plain number used to generate alias

  @Prop()
  url: string;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
