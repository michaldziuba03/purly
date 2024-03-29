import { Provider, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '../schema';
import { injectConnectionToken } from './connection.provider';

export const DATABASE_PROVIDER_TOKEN = Symbol('DATABASE_PROVIDER_TOKEN');

export const DatabaseProvider: Provider = {
  provide: DATABASE_PROVIDER_TOKEN,
  inject: [injectConnectionToken()],
  useFactory: async (pool: Pool) => {
    const db = drizzle(pool, {
      schema,
    });

    return db;
  },
};

export const InjectDB = () => Inject(DATABASE_PROVIDER_TOKEN);
export const injectDbToken = () => DATABASE_PROVIDER_TOKEN;

export type DatabaseContext = NodePgDatabase<typeof schema>;
