import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Server } from 'http';
import { AppModule } from '../src/app.module';
import { setupSession } from '../src/auth/session/session.setup';
import { DatabaseContext, injectDbToken } from '@purly/database';
import { DatabaseTestService } from '@purly/testing';

let server: Server;
let app: INestApplication;

let dbCtx: DatabaseContext;
const dbService = new DatabaseTestService();

global.beforeAll(async () => {
  console.log('Bootstraping app...');
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  setupSession(app);
  app.enableCors();
  app.enableShutdownHooks();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
    })
  );
  server = app.getHttpServer();

  await app.init();
  dbCtx = app.get<DatabaseContext>(injectDbToken());
  await dbService.migrate();
});

global.beforeEach(async () => {
  await dbService.clearDb(dbCtx);
});

global.afterAll(async () => {
  try {
    await dbService.dropTables(dbCtx);
  } catch (err) {
    console.log(err);
  } finally {
    await app.close();
  }
});

export { app, server };
