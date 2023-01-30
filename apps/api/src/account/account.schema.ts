import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { normalizer } from '../database/normalize';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export type AccountDocument = HydratedDocument<Account>;

@Schema({
  timestamps: true,
})
export class Account {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  @Prop()
  name: string;

  @Expose()
  @ApiProperty()
  @Prop()
  picture: string;

  @Expose()
  @ApiProperty()
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ unique: true })
  billingId: string;

  @Expose()
  @Prop()
  plan: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
AccountSchema.plugin(normalizer);
