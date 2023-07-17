import { boolean, pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';

export const reports = pgTable('reports', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email').notNull(),
  url: text('url').notNull(),
  destination: text('destination_url').notNull(),
  isSolved: boolean('solved').default(false),
  type: varchar('abuse_type'),
});
