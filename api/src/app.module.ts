import { Module } from '@nestjs/common';
import { AliasModule } from './alias/alias.module';
import { RangeModule } from './range/range.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';
import { Config } from './config/config';
import { LoggerModule } from './logger/logger.module';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';

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
    AccountModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
