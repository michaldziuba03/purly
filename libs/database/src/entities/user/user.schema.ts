// schemas related to user entity:
import { relations } from 'drizzle-orm';
import {
  boolean,
  pgTable,
  primaryKey,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    username: varchar('username').notNull(),
    email: varchar('email').notNull(),
    password: varchar('password'),
    pictureUrl: varchar('picture_url'),
    pictureKey: varchar('picture_key'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    isVerified: boolean('verified').default(false),
  },
  (schema) => {
    return {
      emailIndex: uniqueIndex('email_index').on(schema.email),
    };
  }
);

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(oauthAccounts),
}));

export const oauthAccounts = pgTable(
  'oauth_accounts',
  {
    providerId: varchar('provider_id').notNull(),
    providerName: varchar('provider_name').notNull(),
    userId: uuid('user_id').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (schema) => ({
    pk: primaryKey(schema.providerId, schema.providerName),
  })
);

export const oauthAccountsRelations = relations(oauthAccounts, ({ one }) => ({
  user: one(users, {
    fields: [oauthAccounts.userId],
    references: [users.id],
  }),
}));

export const resetTokens = pgTable(
  'password_reset_tokens',
  {
    token: varchar('token').notNull(),
    userId: uuid('user_id').primaryKey(),
    expiresAt: timestamp('expires_at'),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (schema) => ({
    resetTokenUnique: uniqueIndex('reset_token_index').on(schema.token),
  })
);
