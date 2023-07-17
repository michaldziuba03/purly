import { isNotNull, relations } from 'drizzle-orm';
import {
  pgTable,
  uniqueIndex,
  uuid,
  varchar,
  integer,
  primaryKey,
  index,
  timestamp,
} from 'drizzle-orm/pg-core';
import { users } from '../user/user.schema';

export enum MemberRole {
  OWNER = 0, // can manage everything
  ADMIN = 100, // can manage members
  MEMBER = 200, // can read and write
  CLIENT = 300, // readonly role
}

export const workspaces = pgTable(
  'workspaces',
  {
    id: uuid('id').primaryKey().primaryKey().defaultRandom(),
    name: varchar('name').notNull(),
    tier: varchar('plan').notNull().default('free'),
    billingId: varchar('billing_id'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (schema) => ({
    billingIdIndex: uniqueIndex('billing_id_index')
      .on(schema.billingId)
      .where(isNotNull(schema.billingId)),
  })
);

export const workspacesMembers = pgTable(
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

export const workspacesMembersRelations = relations(
  workspacesMembers,
  ({ one }) => ({
    user: one(users, {
      fields: [workspacesMembers.userId],
      references: [users.id],
    }),
    workspace: one(workspaces, {
      fields: [workspacesMembers.workspaceId],
      references: [workspaces.id],
    }),
  })
);
