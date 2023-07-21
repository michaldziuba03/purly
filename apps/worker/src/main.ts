import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'worker',
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'workers',
        },
      },
    }
  );

  await app.listen();
}

bootstrap();
