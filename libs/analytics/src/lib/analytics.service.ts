import { Injectable } from '@nestjs/common';
import { InjectClickHouse } from '@md03/nestjs-clickhouse';
import type { ClickHouseClient } from '@clickhouse/client';
import { Click } from './click.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectClickHouse()
    private readonly db: ClickHouseClient
  ) {}

  async recordClick(click: Click) {
    await this.db.insert({
      table: 'clicks',
      values: [
        {
          link_id: click.linkId,
          browser: click.browser,
          country: click.country,
          timestamp: click.timestamp,
          os: click.os,
          referer: click.referer,
        },
      ],
      clickhouse_settings: {
        async_insert: 1,
      },
      format: 'JSONEachRow',
    });
  }

  getBrowsers() {
    throw new Error('Not implemented');
  }

  getOS() {
    throw new Error('Not implemented');
  }

  getReferers() {
    throw new Error('Not implemented');
  }

  getLocations() {
    throw new Error('Not implemented');
  }
}
