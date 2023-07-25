import { isNotNull } from 'drizzle-orm';
import {
  pgTable,
  uniqueIndex,
  uuid,
  varchar,
  timestamp,
} from 'drizzle-orm/pg-core';

export const workspaces = pgTable(
  'workspaces',
  {
    id: uuid('id').primaryKey().primaryKey().defaultRandom(),
    name: varchar('name').notNull(),
    plan: varchar('plan').notNull().default('free'),
    billingId: varchar('billing_id'),
    billingEmail: varchar('billing_email'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (schema) => ({
    billingIdIndex: uniqueIndex('billing_id_index')
      .on(schema.billingId)
      .where(isNotNull(schema.billingId)),
  })
);
