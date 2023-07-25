import request from 'supertest';
import { createUser } from '../../../../api/e2e/helpers';
import { server } from '../../../../api/e2e/setup';
import { RegisterDto } from '../dto/register.dto';

describe('POST /auth/login', () => {
  it('should successfuly create new session', async () => {
    const body: RegisterDto = {
      email: 'test@michaldziuba.dev',
      username: 'Test',
      password: 'supersecretpassword',
    };
    await createUser(body);

    await request(server).post('/auth/login').send(body).expect(201);
  });

  it('should fail when invalid credentials provided', async () => {
    const body: RegisterDto = {
      email: 'test@michaldziuba.dev',
      username: 'Test',
      password: 'supersecretpassword',
    };
    await createUser(body);

    await request(server)
      .post('/auth/login')
      .send({
        ...body,
        password: 'invalid_password',
      })
      .expect(400);
  });
});
