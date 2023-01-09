import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Stats, StatsSchema} from "./stats.model";
import {StatsProcessor} from "./stats.processor";
import {BullModule} from "@nestjs/bull";

@Module({
  imports: [
      BullModule.registerQueue({
          name: 'stats',
      }),
      MongooseModule.forFeature([
        { name: Stats.name, schema: StatsSchema }
      ])
  ],
  providers: [StatsService, StatsProcessor],
})
export class StatsModule {}
