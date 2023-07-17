import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { DatabaseContext, InjectDB } from './database.provider';
import { sql } from 'drizzle-orm';

@Injectable()
export class DatabaseHealthIndicator extends HealthIndicator {
  constructor(
    @InjectDB()
    private readonly db: DatabaseContext
  ) {
    super();
  }

  async healthCheck(key = 'db'): Promise<HealthIndicatorResult> {
    const isHealthy: boolean = await this.pingDb(key);
    return this.getStatus(key, isHealthy);
  }

  private async pingDb(key: string) {
    try {
      const statement = sql`SELECT 1+1 AS result`;
      const result = await this.db.execute(statement);
      if (!result.rowCount) {
        return false;
      }

      const counter = result.rows[0];

      if (!counter) {
        return false;
      }

      if (!counter['result']) {
        return false;
      }

      return counter['result'] === 2;
    } catch (err) {
      this.throwHealthCheck(key, err);
      return false;
    }
  }

  private throwHealthCheck(key: string, err: unknown) {
    const status = this.getStatus(key, false);
    if (err instanceof Error) {
      throw new HealthCheckError(err.message, status);
    }

    throw new HealthCheckError('Unknown error', status);
  }
}
