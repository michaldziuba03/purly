import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AccountService } from '../../src/account/account.service';
import { CreateAccountDTO } from '../../src/account/dto';

export async function getSessionCookie(
  app: INestApplication,
  user: CreateAccountDTO,
) {
  const account = await createAccount(app, user);
  const result = await request(app.getHttpServer()).post('/auth/login').send({
    email: account.email,
    password: user.password,
  });

  return result.headers.cookie;
}

export function createAccount(app: INestApplication, user: CreateAccountDTO) {
  const accountService = app.get<AccountService>(AccountService);
  return accountService.createAccount(user);
}
