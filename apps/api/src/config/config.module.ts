import { Global, Module } from '@nestjs/common';
import { ConfigModule as BaseConfigModule } from '@nestjs/config';
import { ConfigSchema } from './config.schema';
import { Config } from './config';

@Global()
@Module({
  imports: [
    BaseConfigModule.forRoot({
      cache: true,
      validationSchema: ConfigSchema,
    }),
  ],
  providers: [Config],
  exports: [Config],
})
export class ConfigModule {}
