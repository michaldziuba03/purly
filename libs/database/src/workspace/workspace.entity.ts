import { Type } from 'class-transformer';
import { User } from '../user';
import { MemberRole } from './workspace.schema';

export class Workspace {
  id: string;
  name: string;
  plan: string;
  billingId?: string;
  billingEmail?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class InsertWorkspace {
  name: string;
}

export class Member {
  workspaceId: string;
  userId: string;
  role: MemberRole;
  @Type(() => User)
  user?: User;
}
