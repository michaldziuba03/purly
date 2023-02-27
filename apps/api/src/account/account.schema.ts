import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { normalizer } from '../database/normalize';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { OAuthProvider } from './account.constants';

export type AccountDocument = HydratedDocument<Account>;

export class FederatedAccount {
  provider: OAuthProvider;
  subject: string;
}

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

  @Prop({ unique: true, sparse: true })
  billingId: string;

  @Expose()
  @Prop()
  plan: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: [] })
  accounts: FederatedAccount[];
}

export const AccountSchema = SchemaFactory.createForClass(Account);
AccountSchema.plugin(normalizer);
AccountSchema.index(
  { 'accounts.provider': 1, 'accounts.subject': 1 },
  { unique: true, sparse: true },
);
