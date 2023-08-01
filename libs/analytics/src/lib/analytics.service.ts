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

  async topQuery(param: string, linkId: string) {
    const result = await this.db.query({
      query: `SELECT countMerge(hits) as hits, ${param}
        FROM clicks_sources_mv
        WHERE link_id={linkId: String}
        GROUP BY ${param}
        ORDER BY hits DESC
        LIMIT 10;
      `,
      format: 'JSONEachRow',
      query_params: {
        linkId,
      },
    });

    return await result.json();
  }

  getTopBrowsers(linkId: string) {
    return this.topQuery('browser', linkId);
  }

  getTopReferers(linkId: string) {
    return this.topQuery('referer', linkId);
  }

  getTopCountries(linkId: string) {
    return this.topQuery('country', linkId);
  }

  getTopOS(linkId: string) {
    return this.topQuery('os', linkId);
  }
}
