import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { TimestampEntity } from './timestamp.entity';
import { Workspace } from './workspace.entity';
import { User } from './user.entity';

export enum Permissions {
  OWNER = 0,
  ADMIN = 1,
  MEMBER = 2,
  READONLY = 3,
}

@Entity('workspace_members')
@Unique(['userId', 'workspaceId'])
export class Member extends TimestampEntity {
  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @PrimaryColumn({ name: 'workspace_id' })
  workspaceId: string;

  @Column({ enum: Permissions })
  permission: Permissions;

  @ManyToOne(() => Workspace, (workspace) => workspace.id)
  @JoinColumn({ name: 'workspace_id' })
  workspace: Workspace;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
