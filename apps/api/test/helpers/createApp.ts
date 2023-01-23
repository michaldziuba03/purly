import { AppModule } from '../../src/app.module';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Config } from '../../src/config/config';
import { validatorOptions } from '../../src/common/options';
import { setupSession } from '../../src/session';

export async function createTestApp(): Promise<INestApplication> {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  const config = moduleFixture.get<Config>(Config);

  app.enableShutdownHooks();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      ...validatorOptions,
    }),
  );
  setupSession(app, config);

  await app.init();

  return app;
}
