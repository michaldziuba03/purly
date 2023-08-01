import { relations } from 'drizzle-orm';
import { pgTable, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core';
import { links } from '../link/link.schema';

export const bioPages = pgTable(
  'bio_pages',
  {
    workspaceId: uuid('workspace_id').primaryKey(),
    identifier: varchar('identifier').notNull(), // editable identifier: website/m/identifier00
    name: varchar('name'),
    description: varchar('description').default(''),
    bgColor: varchar('bg_color'),
  },
  (schema) => ({
    uniqueIndentifier: uniqueIndex('bio_id_unique').on(schema.identifier),
  })
);

export const bioElements = pgTable('bio_elements', {
  id: uuid('id').primaryKey().defaultRandom(),
  workspaceId: uuid('workspace_id'),
  redirect: varchar('destination').notNull(),
  label: varchar('label'),
  linkId: uuid('link_id').notNull(),
});

export const bioPagesRelations = relations(bioPages, ({ many }) => ({
  elements: many(bioElements),
}));

export const bioElementsRelations = relations(bioElements, ({ one }) => ({
  page: one(bioPages, {
    fields: [bioElements.workspaceId],
    references: [bioPages.workspaceId],
  }),
  link: one(links, {
    fields: [bioElements.linkId],
    references: [links.id],
  }),
}));
