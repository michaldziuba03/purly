import { HttpStatus, INestApplication } from '@nestjs/common';
import { Server } from 'http';
import { cleanDB, createTestApp, getSessionCookie } from './helpers';
import * as request from 'supertest';
import { UpdateAccountDTO } from '../src/account/dto';

describe('AccountController (e2e)', () => {
  let app: INestApplication;
  let server: Server;

  beforeAll(async () => {
    app = await createTestApp();
    server = app.getHttpServer();
  });

  beforeEach(async () => {
    await cleanDB(app);
  });

  afterAll(async () => {
    await app.close();
  });

  const mockUser = {
    email: 'test1@test.com',
    name: 'Test',
    password: 'password',
  };

  describe('GET /accounts/me', () => {
    const path = '/accounts/me';

    it('should reject unauthenticated user', async () => {
      return request(server).get(path).expect(HttpStatus.FORBIDDEN);
    });

    it('should return account object to authenticated user', async () => {
      const sessionCookie = await getSessionCookie(app, mockUser);
      return request(server)
        .get(path)
        .set('Cookie', sessionCookie)
        .expect(HttpStatus.OK)
        .expect((result) => {
          const account = result.body;
          expect(typeof account.id).toEqual('string');
          expect(account.password).toBeUndefined();
          expect(account.email).toEqual(mockUser.email);
        });
    });
  });

  describe('POST /accounts/me', () => {
    const path = '/accounts/me';
    const updatedData: UpdateAccountDTO = {
      name: 'Michal',
    };

    it('should reject unauthenticated user', async () => {
      return request(server)
        .post(path)
        .send(updatedData)
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should update account', async () => {
      const sessionCookie = await getSessionCookie(app, mockUser);
      return request(server)
        .post(path)
        .send(updatedData)
        .set('Cookie', sessionCookie)
        .expect(HttpStatus.CREATED)
        .expect((result) => {
          const account = result.body;
          expect(account.name).not.toEqual(mockUser.name);
          expect(account.password).toBeUndefined();
        });
    });
  });
});
