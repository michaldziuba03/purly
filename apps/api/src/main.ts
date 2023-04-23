import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './config/config';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { setupSession } from './auth/session/session.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true, // essential for stripe webhook
  });
  const config = app.get<Config>(Config);
  app.enableCors();
  app.enableShutdownHooks();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
    }),
  );

  if (config.apiPrefix) {
    app.setGlobalPrefix(config.apiPrefix);
  }

  // Middlewares:
  app.use(helmet());
  setupSession(app, config);

  await app.listen(config.port);
}

bootstrap();
