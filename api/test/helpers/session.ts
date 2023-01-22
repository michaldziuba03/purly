import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AccountService } from '../../src/account/account.service';
import { CreateAccountDTO } from '../../src/account/dto';

export async function getSessionCookie(
  app: INestApplication,
  user: CreateAccountDTO,
) {
  const account = await createAccount(app, user);
  const result = await request(app.getHttpServer())
    .post('/auth/login')
    .send({
      email: account.email,
      password: user.password,
    })
    .expect(HttpStatus.CREATED);

  return result.get('Set-Cookie');
}

export function createAccount(app: INestApplication, user: CreateAccountDTO) {
  const accountService = app.get<AccountService>(AccountService);
  return accountService.createAccount(user);
}
