import { Type } from 'class-transformer';
import { User } from '../user';
import { MemberRole } from '@purly/shared';

export class Member {
  workspaceId: string;
  userId: string;
  role: MemberRole;
  @Type(() => User)
  user?: User;
}
