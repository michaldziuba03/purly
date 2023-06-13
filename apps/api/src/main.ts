import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import helmet from 'helmet';

import { AppModule } from './app.module';
import { setupSession } from './auth/session/session.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

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
