import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as Sentry from '@sentry/node';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { SentryFilter } from './shared/sentry.filter';
import { setupSession } from './auth/session/session.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true, // important for StripeWebhook controller
    bufferLogs: true,
  });
  const globalPrefix = 'api';

  const logger = app.get(Logger);
  app.useLogger(logger);

  if (process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      sendDefaultPii: false,
      integrations: [new Sentry.Integrations.Http({ tracing: true })],
    });

    app.use(Sentry.Handlers.requestHandler());
    app.use(Sentry.Handlers.tracingHandler());
    const sentryFilter = new SentryFilter(app.getHttpAdapter());
    app.useGlobalFilters(sentryFilter);
  }

  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  app.enableShutdownHooks();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
    })
  );

  app.use(helmet());
  setupSession(app);
  const port = process.env.PORT || 8000;
  await app.listen(port);
}

bootstrap();
