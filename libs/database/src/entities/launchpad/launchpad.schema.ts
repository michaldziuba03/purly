import { relations } from 'drizzle-orm';
import { pgTable, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core';
import { links } from '../link/link.schema';

export const launchpads = pgTable(
  'launchpads',
  {
    workspaceId: uuid('workspace_id').primaryKey(),
    slug: varchar('slug').notNull(), // editable identifier: website/m/identifier00
    name: varchar('name'),
    description: varchar('description').default(''),
    bgColor: varchar('bg_color'),
  },
  (schema) => ({
    uniqueIndentifier: uniqueIndex('bio_id_unique').on(schema.slug),
  })
);

export const launchpadsElements = pgTable('launchpads_elements', {
  id: uuid('id').primaryKey().defaultRandom(),
  workspaceId: uuid('workspace_id'),
  redirect: varchar('redirect').notNull(),
  label: varchar('label'),
  linkId: uuid('link_id').notNull(),
});

export const launchpadsRelations = relations(launchpads, ({ many }) => ({
  elements: many(launchpadsElements),
}));

export const elementsRelations = relations(launchpadsElements, ({ one }) => ({
  launchpad: one(launchpads, {
    fields: [launchpadsElements.workspaceId],
    references: [launchpads.workspaceId],
  }),
  link: one(links, {
    fields: [launchpadsElements.linkId],
    references: [links.id],
  }),
}));
