import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const bioPages = pgTable('bio_pages', {
  workspaceId: uuid('workspace_id').primaryKey(),
  identifier: varchar('identifier').notNull(),
  description: varchar('description').default(''),
  bgColor: varchar('bg_color'),
});
