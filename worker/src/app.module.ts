import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { Config } from './config/config';
import { ConfigModule } from './config/config.module';
import { StatsModule } from './stats/stats.module';
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      inject: [Config],
      useFactory: (config: Config) => ({
        uri: config.mongoUri,
      })
    }),
    BullModule.forRootAsync({
      inject: [Config],
      useFactory: (config: Config) => ({
        url: config.redisUri,
      })
    }),
    StatsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
