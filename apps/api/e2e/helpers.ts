import request from 'supertest';
import { app, server } from './setup';
import { RegisterDto } from '../src/auth/dto/register.dto';
import { Register } from '../src/auth/usecases/register.usecase';
import { User } from '@purly/database';

export const defaultUser: RegisterDto = {
  email: 'test@michaldziuba.dev',
  username: 'Test Account',
  password: 'supersecret',
};

export async function createUser(data = defaultUser) {
  const registerUsecase = app.get<Register>(Register);
  const user = await registerUsecase.execute(data);

  return user;
}

export class Session {
  public user: User;
  private cookies: string;

  constructor(private readonly userData = defaultUser) {}

  async init() {
    const result = await request(server)
      .post('/auth/register')
      .send(this.userData)
      .expect(201);

    this.user = result.body;
    this.cookies = result.header['set-cookie'];
  }

  get request() {
    const hook =
      (method: string) =>
      (...args) => {
        return request(server)
          [method](...args)
          .set('Cookie', this.cookies);
      };

    return {
      post: hook('post'),
      get: hook('get'),
      put: hook('put'),
      delete: hook('delete'),
      patch: hook('patch'),
    };
  }
}
