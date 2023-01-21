import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { cleanDB, createAccount, createTestApp } from './helpers';
import { Server } from 'http';

describe('AuthController (e2e)', () => {
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

  describe('POST /auth/register', () => {
    const path = '/auth/register';

    it('should fail name validation', async () => {
      return request(server)
        .post(path)
        .send({
          name: 'm',
          email: 'mail@test.com',
          password: 'password',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should fail email validation', async () => {
      return request(server)
        .post(path)
        .send({
          name: 'test',
          email: 'mailtest.com',
          password: 'password',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should fail password validation', async () => {
      return request(server)
        .post(path)
        .send({
          name: 'test',
          email: 'mail@test.com',
          password: 'pa',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    const mockUser = {
      name: 'test1',
      email: 'test1@test.com',
      password: 'password',
    };

    it('should create new user successfully', async () => {
      return request(server)
        .post(path)
        .send(mockUser)
        .expect((result) => {
          const account = result.body;
          expect(typeof account.id).toEqual('string');
          expect(account.password).toBeUndefined();
          expect(account.name).toEqual(mockUser.name);
          expect(account.email).toEqual(mockUser.email);
        });
    });

    it('should fail and say that user already exists', async () => {
      await createAccount(app, mockUser);
      return request(server)
        .post(path)
        .send(mockUser)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('POST /auth/login', () => {
    const path = '/auth/login';

    const mockUser = {
      email: 'test1@test.com',
      name: 'test',
      password: 'password',
    };

    beforeEach(async () => {
      await cleanDB(app);
      await createAccount(app, mockUser);
    });

    it('should fail request with invalid credentials', async () => {
      return request(server)
        .post(path)
        .send({
          email: 'test1@test.com',
          password: 'password2',
        })
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should login existing user successfully', async () => {
      return request(server)
        .post(path)
        .send(mockUser)
        .expect(HttpStatus.CREATED);
    });
  });

  describe('POST /auth/logout', () => {
    const path = '/auth/logout';

    it('should logout user', async () => {
      return request(server).post(path).expect(HttpStatus.CREATED);
    });
  });
});
