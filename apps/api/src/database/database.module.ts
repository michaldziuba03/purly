import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Config } from '../config/config';
import { TransactionManager } from './transaction.manager';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [Config],
      useFactory: async (config: Config) => ({
        uri: config.mongoURI,
      }),
    }),
  ],
  providers: [TransactionManager],
  exports: [TransactionManager],
})
export class DatabaseModule {}
