import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as Sentry from '@sentry/node';

import helmet from 'helmet';

import { AppModule } from './app.module';
import { setupSession } from './auth/session/session.setup';
import { SentryFilter } from './shared/sentry.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true, // important for StripeWebhook controller
  });
  const globalPrefix = 'api';

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
