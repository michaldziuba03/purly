import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { normalizer } from '../database/normalize';
import { Expose } from 'class-transformer';

export type AccountDocument = HydratedDocument<Account>;

@Schema({
  timestamps: true,
})
export class Account {
  @Expose()
  id: string;

  @Expose()
  @Prop()
  name: string;

  @Expose()
  @Prop()
  picture: string;

  @Expose()
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
AccountSchema.plugin(normalizer);
