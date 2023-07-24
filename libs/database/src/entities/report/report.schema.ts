import { boolean, pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';

export const reports = pgTable('reports', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email').notNull(),
  alias: varchar('alias').notNull(),
  message: varchar('message').default(''),
  url: text('url').notNull(),
  destination: text('destination_url').notNull(),
  isSolved: boolean('solved').default(false),
  type: varchar('abuse_type'),
  linkId: uuid('link_id').notNull(),
});
