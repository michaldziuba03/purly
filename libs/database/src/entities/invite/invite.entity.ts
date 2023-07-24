import { Exclude } from 'class-transformer';

export class Invite {
  @Exclude({ toPlainOnly: true })
  token: string;
  workspaceId: string;
  email: string;
  role: number;
  invitedAt?: Date;
  expiresAt?: Date;
}
