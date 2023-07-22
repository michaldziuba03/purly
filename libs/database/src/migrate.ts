import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

async function runMigration() {
  console.log('Creating connection...');
  const pool = new Pool({
    connectionString: process.env['POSTGRES_URI'],
  });

  const db = drizzle(pool);
  await migrate(db, { migrationsFolder: './tools/migrations' });
}

runMigration();
