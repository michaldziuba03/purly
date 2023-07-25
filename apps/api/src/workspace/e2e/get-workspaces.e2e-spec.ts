import { Session } from '../../../../api/e2e/helpers';
import { CreateWorkspaceDto } from '../dto/create-workspace.dto';

describe('GET /workspaces', () => {
  it('should return empty array', async () => {
    const session = new Session();
    await session.init();

    const result = await session.request.get('/workspaces').expect(200);

    expect(result.body.length).toEqual(0);
  });

  it('should return array of workspaces', async () => {
    const session = new Session();
    await session.init();

    const body: CreateWorkspaceDto = {
      name: 'Test workspace',
    };

    await session.request.post('/workspaces').send(body).expect(201);

    const result = await session.request.get('/workspaces').expect(200);

    expect(result.body.length).toEqual(1);
    expect(result.body[0].name).toEqual(body.name);
  });
});
