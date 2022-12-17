import { Module } from '@nestjs/common';
import { LoggerModule as PinoModule, Params } from 'nestjs-pino';
import { Config } from 'src/config/config';
import { NodeEnv } from 'src/config/config.schema';

async function createPino(config: Config): Promise<Params> {
    return {
        pinoHttp: {
            transport: config.env === NodeEnv.dev ? {
                target: 'pino-pretty',
                options: { singleLine: true }
            } : undefined
        }
    }
}

@Module({
    imports: [
        PinoModule.forRootAsync({
            inject: [Config],
            useFactory: createPino,
        })
    ]
})
export class LoggerModule {}
