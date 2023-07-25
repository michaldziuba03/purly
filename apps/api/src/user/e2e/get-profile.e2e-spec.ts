import { Session } from '../../../../api/e2e/helpers';

describe('GET /users/me', () => {
  it('should return profile of currently authenticated user', async () => {
    const session = new Session();
    await session.init();

    const res = await session.request.get('/users/me').expect(200);
    expect(res.body.username).toEqual(session.user.username);
  });
});
