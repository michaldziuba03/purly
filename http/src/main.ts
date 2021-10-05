import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// middlewares:
import * as helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
  });

  app.set('trust proxy');
  app.use(helmet());
  await app.listen(3000);
}
bootstrap();
