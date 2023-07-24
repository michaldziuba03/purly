import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';

export const links = pgTable(
  'links',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    alias: varchar('alias').notNull(),
    name: varchar('name'),
    url: text('long_url').notNull(),
    workspaceId: uuid('workspace_id').notNull(),
    isActive: boolean('is_active').default(true),
    expiresAt: timestamp('expires_at'),
    androidRedirect: text('android_redirect'),
    iosRedirect: text('ios_redirect'),
    enableUtm: boolean('enable_utm').default(false),
    utmSource: varchar('utm_source'),
    utmMedium: varchar('utm_medium'),
    utmCampaign: varchar('utm_campaign'),
    utmTerm: varchar('utm_term'),
    utmContent: varchar('utm_content'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (schema) => ({
    aliasUniqueIdx: uniqueIndex('alias_index').on(schema.alias),
    linkWorkspaceIdx: index('link_workspace_index').on(schema.workspaceId),
  })
);
