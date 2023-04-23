import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectIdProp } from "../decorators";

export type LinkDocument = HydratedDocument<Link>;

@Schema({
  timestamps: true,
})
export class Link {
  @Prop({ unique: true })
  alias: string;

  @ObjectIdProp()
  userId: string;

  @Prop()
  sequence: number; // plain number used to generate alias

  @Prop()
  url: string;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
