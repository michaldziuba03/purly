import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Config } from '../config/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [Config],
      useFactory: async (config: Config) => ({
        uri: config.mongoURI,
      }),
    }),
  ],
})
export class DatabaseModule {}
