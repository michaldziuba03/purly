import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const invites = pgTable('invites', {
  id: varchar('id').primaryKey(),
  workspaceId: uuid('workspace_id').notNull(),
  email: varchar('email').notNull(),
  role: integer('role').notNull(),
  invitedAt: timestamp('invited_at').defaultNow(),
});
