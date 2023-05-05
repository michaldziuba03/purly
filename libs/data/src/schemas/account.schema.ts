import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Exclude } from 'class-transformer';

export enum OAuthProviders {
  GOOGLE = 'google',
  GITHUB = 'github',
}

export type AccountDocument = HydratedDocument<Account>;

export class FederatedAccount {
  provider: OAuthProviders;
  subject: string;
}

@Schema({
  timestamps: true,
})
export class Account {
  id: string;

  @Prop()
  name: string;

  @Prop()
  picture: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Prop({ unique: true, sparse: true })
  billingId: string;

  @Prop()
  plan: string;

  @Prop({ unique: true, sparse: true })
  @Exclude({ toPlainOnly: true })
  verificationToken?: string;

  @Prop()
  verificationExpiration?: number;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: [] })
  accounts: FederatedAccount[];
}

export const AccountSchema = SchemaFactory.createForClass(Account);

AccountSchema.index(
  { 'accounts.provider': 1, 'accounts.subject': 1 },
  { unique: true, sparse: true },
);
