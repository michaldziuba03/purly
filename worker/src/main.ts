import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule);

  app.listen()
  .then(() => {
    Logger.log('Worker is waiting for tasks');
  });
}

bootstrap();
