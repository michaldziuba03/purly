import { Session } from '../../../../api/e2e/helpers';
import { UpdateProfileDto } from '../dto/update-profile.dto';

describe('PATCH /users/me', () => {
  it('should update profile of currently authenticated user', async () => {
    const session = new Session();
    await session.init();

    const body: UpdateProfileDto = {
      username: 'Mercia',
    };

    const res = await session.request.patch('/users/me').send(body).expect(200);

    // old data saved in session should be NOT equal to updated data.
    expect(res.body.username).not.toEqual(session.user.username);
  });
});
