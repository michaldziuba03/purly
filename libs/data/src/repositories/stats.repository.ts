import { InjectClickHouse } from "@md03/nestjs-clickhouse";
import type { ClickHouseClient } from '@clickhouse/client';
import {ClickStats, Stats} from "../schemas/stats.schema";
import { Injectable } from "@nestjs/common";
import {plainToInstance} from "class-transformer";

@Injectable()
export class StatsRepository {
  constructor(
    @InjectClickHouse()
    private readonly client: ClickHouseClient,
  ) {}

  async recordClick(click: Partial<Stats>) {
    await this.client.insert({
      values: [click],
      table: 'clicks',
      clickhouse_settings: {
        async_insert: 1,
      }
    });
  }

  async getClicks(alias: string) {
    const result = await this.client.query({
      query: `SELECT timestamp, count(*) as views
              FROM stats_test WHERE alias={alias: String}
              GROUP BY timestamp
              ORDER BY timestamp DESC
              LIMIT 30`,
      format: 'JSONEachRow',
      query_params: {
        alias,
      },
    });

    const rawJson = await result.json();
    return plainToInstance(ClickStats, rawJson);
  }
}
