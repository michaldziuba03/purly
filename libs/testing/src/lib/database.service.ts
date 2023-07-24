import { DatabaseContext, runMigration } from '@purly/database';
import { sql } from 'drizzle-orm';

export class DatabaseTestService {
  constructor() {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error('Only test environment is allowed to run this code!');
    }
  }

  async migrate() {
    await runMigration();
  }

  private async queryTables(db: DatabaseContext) {
    type TablesQuery = { tablename: string };
    const tables = await db.execute<TablesQuery>(sql`
      SELECT tablename
      FROM pg_catalog.pg_tables
      WHERE tableowner = 'postgres'
      AND schemaname = 'public';
    `);

    return tables;
  }

  async clearDb(db: DatabaseContext) {
    const tables = await this.queryTables(db);

    await db.transaction(async (tx) => {
      for (const table of tables.rows) {
        await tx.execute(sql.raw(`TRUNCATE TABLE ${table.tablename} CASCADE`));
      }
    });
  }

  async dropTables(db: DatabaseContext) {
    const tables = await this.queryTables(db);

    await db.transaction(async (tx) => {
      for (const table of tables.rows) {
        await tx.execute(sql.raw(`DROP TABLE ${table.tablename} CASCADE`));
      }
      // DROP SCHEMA WHERE drizzle migrations are saved:
      await tx.execute(sql`DROP SCHEMA drizzle CASCADE`);
    });
  }
}
