import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './config/config';
import { ValidationPipe } from '@nestjs/common';
import { validatorOptions } from './common/options';
import helmet from 'helmet';
import { setupSession } from './common/session';
import { setupSwagger } from './common/swagger';

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
      ...validatorOptions,
    }),
  );

  if (config.apiPrefix) {
    app.setGlobalPrefix(config.apiPrefix);
  }

  // Middlewares:
  app.use(helmet());
  setupSession(app, config);

  if (config.isDev) {
    setupSwagger(app);
  }

  await app.listen(config.port);
}

bootstrap();
