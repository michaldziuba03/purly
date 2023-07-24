import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

export async function runMigration() {
  console.log('Creating connection...');
  const pool = new Pool({
    connectionString: process.env['POSTGRES_URI'],
  });

  const db = drizzle(pool);
  console.log('Running migrations...');
  await migrate(db, { migrationsFolder: './tools/migrations' });
  await pool.end();
}
