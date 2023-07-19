import {
  index,
  integer,
  pgTable,
  primaryKey,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const invites = pgTable(
  'invites',
  {
    token: varchar('token').notNull(),
    workspaceId: uuid('workspace_id').notNull(),
    email: varchar('email').notNull(),
    role: integer('role').notNull(),
    invitedAt: timestamp('invited_at').defaultNow(),
    expiresAt: timestamp('expires_at'),
  },
  (schema) => ({
    uniqueInviteToken: uniqueIndex('invite_token_idx').on(schema.token),
    workspaceIdx: index('invites_workspace_idx').on(schema.workspaceId),
    invitesPk: primaryKey(schema.email, schema.workspaceId),
  })
);
