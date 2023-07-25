import request from 'supertest';
import { Session } from '../../../../api/e2e/helpers';
import { CreateWorkspaceDto } from '../dto/create-workspace.dto';
import { server } from '../../../../api/e2e/setup';

describe('POST /workspaces', () => {
  it('should reject unauthenticated user', async () => {
    const body: CreateWorkspaceDto = {
      name: 'Test workspace',
    };

    await request(server).post('/workspaces').send(body).expect(403);
  });

  it('should successfuly create workspace', async () => {
    const session = new Session();
    await session.init();

    const body: CreateWorkspaceDto = {
      name: 'Test workspace',
    };

    await session.request.post('/workspaces').send(body).expect(201);
  });
});
