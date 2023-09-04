import { Exclude } from 'class-transformer';
import { Workspace } from '../workspace';

export class Invite {
  @Exclude({ toPlainOnly: true })
  token: string;
  workspaceId: string;
  workspace?: Pick<Workspace, 'slug'>;
  email: string;
  role: number;
  invitedAt?: Date;
  expiresAt?: Date;
}
