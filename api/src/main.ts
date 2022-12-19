import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { Config } from './config/config';

// FASTIFY PLUGINS:
import helmet from '@fastify/helmet';
import session from '@fastify/secure-session';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      rawBody: true, // required by stripe webhook
    }
  );
  
  const config = app.get<Config>(Config);
  app.enableCors();
  app.enableShutdownHooks();

  app.register(helmet);
  app.register(session, {
    cookieName: 'session',
    key: Buffer.from(config.sessionKey, 'hex'),
    cookie: {
      httpOnly: true,
      path: '/',
    }
  })

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    stopAtFirstError: true,
    transform: true,
  }));
  
  await app.listen(config.port);
}
bootstrap();
