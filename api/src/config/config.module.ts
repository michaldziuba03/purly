import { Global, Module } from '@nestjs/common';
import {  ConfigModule as BaseConfigModule } from '@nestjs/config';
import { Config } from './config';
import { configSchema } from './config.schema';

@Global()
@Module({
    imports: [
        BaseConfigModule.forRoot({
            cache: true,
            validationSchema: configSchema,
        })
    ],
    providers: [Config],
    exports: [Config],
})
export class ConfigModule {}
