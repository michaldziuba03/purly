import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { Config } from './config/config';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule,
    BullModule.forRootAsync({
      inject: [Config],
      useFactory: (config: Config) => ({
        url: config.redisUri,
      })
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
