import { Provider, Inject } from '@nestjs/common';
import { Pool } from 'pg';

export const CONNECTION_PROVIDER_TOKEN = Symbol('CONNECTION_PROVIDER_TOKEN');

export const ConnectionProvider: Provider = {
  provide: CONNECTION_PROVIDER_TOKEN,
  useFactory: async () => {
    const pool = new Pool({
      connectionString: process.env['POSTGRES_URI'],
    });

    return pool;
  },
};

export const InjectConnection = () => Inject(CONNECTION_PROVIDER_TOKEN);
export const injectConnectionToken = () => CONNECTION_PROVIDER_TOKEN;
