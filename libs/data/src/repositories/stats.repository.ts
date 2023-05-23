import { InjectClickHouse } from "@md03/nestjs-clickhouse";
import type { ClickHouseClient } from '@clickhouse/client';
import { ClickStats, Stats } from "../schemas/stats.schema";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

@Injectable()
export class StatsRepository implements OnModuleInit {
  constructor(
    @InjectClickHouse()
    private readonly client: ClickHouseClient,
  ) {}

  async onModuleInit() {
    if (process.env.NODE_ENV !== 'production') {
      await this.client.exec({
        query: `
        CREATE TABLE IF NOT EXISTS clicks
        (
            alias String,
            timestamp Date,
            referer String,
            browser String,
            os String,
            country String
        )
        ENGINE = MergeTree
        PRIMARY KEY (alias, timestamp)
        TTL timestamp + INTERVAL 1 MONTH`,
      });
    }
  }

  async recordClick(click: Partial<Stats>) {
    await this.client.insert({
      values: [click],
      table: 'clicks',
      clickhouse_settings: {
        async_insert: 1,
      },
      format: "JSONEachRow",
    });
  }

  async getClicks(alias: string) {
    const result = await this.client.query({
      query: `SELECT timestamp, count(timestamp) as views
              FROM clicks WHERE alias={alias: String}
              GROUP BY timestamp
              ORDER BY timestamp DESC
              WITH FILL STEP -1
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
