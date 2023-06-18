import { DynamicModule, Module } from '@nestjs/common';
import { LoggerModule as PinoModule } from 'nestjs-pino';

const sensitiveFields = [
  'password',
  'email',
  'name',
  'username',
  'sid',
  'token',
  'authorization',
  'auth',
  'jwt',
  'session',
];

const REDACT_PATHS = [
  'req.headers.authorization',
  'req.headers.cookie',
  'res.headers["set-cookie"]',
];

@Module({})
export class LoggerModule {
  static forRoot(): DynamicModule {
    const transport =
      process.env['NODE_ENV'] !== 'production'
        ? { target: 'pino-pretty' }
        : undefined;

    const isTestEnv = process.env['NODE_ENV'] === 'test';
    const redactPaths = [
      ...REDACT_PATHS,
      ...sensitiveFields,
      ...sensitiveFields.map((field) => `[*].${field}`),
      ...sensitiveFields.map((field) => `*.${field}`),
    ];

    return {
      module: LoggerModule,
      imports: [
        PinoModule.forRoot({
          pinoHttp: {
            transport,
            redact: {
              censor: '[Filtered]',
              paths: redactPaths,
            },
            base: {
              pid: process.pid,
            },
            autoLogging: !isTestEnv,
          },
        }),
      ],
    };
  }
}
