import request from 'supertest';
import { server } from '../../../e2e/setup';

describe('POST /auth/register', () => {
  it('should create new user', async () => {
    const email = 'example@michaldziuba.dev';

    await request(server)
      .post('/auth/register')
      .send({
        email,
        password: 'supersecretpassword',
        username: 'Example',
      })
      .expect(201);
  });
});
