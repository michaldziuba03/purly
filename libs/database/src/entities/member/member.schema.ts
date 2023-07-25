import { MemberRole } from '@purly/shared';
import { relations } from 'drizzle-orm';
import {
  index,
  integer,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { users } from '../user/user.schema';
import { workspaces } from '../workspace/workspace.schema';

export const members = pgTable(
  'workspaces_members',
  {
    userId: uuid('user_id').notNull(),
    workspaceId: uuid('workspace_id').notNull(),
    role: integer('role').notNull().default(MemberRole.MEMBER),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (schema) => ({
    membersPk: primaryKey(schema.workspaceId, schema.userId),
    memberIdx: index('workspaces_member_idx').on(schema.userId),
    workspaceIdx: index('workspaces_workspace_idx').on(schema.workspaceId),
  })
);

export const workspacesMembersRelations = relations(members, ({ one }) => ({
  user: one(users, {
    fields: [members.userId],
    references: [users.id],
  }),
  workspace: one(workspaces, {
    fields: [members.workspaceId],
    references: [workspaces.id],
  }),
}));
