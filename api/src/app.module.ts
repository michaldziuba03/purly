import { Module } from '@nestjs/common';
import { AliasModule } from './alias/alias.module';
import { RangeModule } from './range/range.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';
import { Config } from './config/config';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    MongooseModule.forRootAsync({
      inject: [Config],
      useFactory: async (config: Config) => {
        return { uri: config.mongoURI }
      }
    }),
    RangeModule,
    AliasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
