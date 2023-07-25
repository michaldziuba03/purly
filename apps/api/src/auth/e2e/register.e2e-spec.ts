import request from 'supertest';
import { server } from '../../../e2e/setup';
import { RegisterDto } from '../dto/register.dto';

describe('POST /auth/register', () => {
  it('should create new user', async () => {
    const body: RegisterDto = {
      email: 'example@michaldziuba.dev',
      username: 'Example',
      password: 'supersecretpassword',
    };

    await request(server).post('/auth/register').send(body).expect(201);
  });

  it('should raise error when user already exists', async () => {
    const body: RegisterDto = {
      email: 'mail@example.com',
      username: 'Example',
      password: 'secretpassword',
    };

    await request(server).post('/auth/register').send(body).expect(201);

    await request(server).post('/auth/register').send(body).expect(400);
  });

  it('should fail email validation', async () => {
    const body: RegisterDto = {
      email: 'invalidemail',
      username: 'Valid name',
      password: 'secretpass',
    };

    await request(server).post('/auth/register').send(body).expect(400);
  });

  it('should fail when body is incomplete', async () => {
    const body: Partial<RegisterDto> = {
      username: 'Example',
    };

    await request(server).post('/auth/register').send(body).expect(400);
  });
});
