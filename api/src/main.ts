import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import helmet = require('@fastify/helmet');
import { ValidationPipe } from '@nestjs/common';
import { Config } from './config/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  
  const config = app.get<Config>(Config);
  app.enableCors();
  app.enableShutdownHooks();
  app.register(helmet);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    stopAtFirstError: true,
    transform: true,
  }));
  
  await app.listen(config.port);
}
bootstrap();
