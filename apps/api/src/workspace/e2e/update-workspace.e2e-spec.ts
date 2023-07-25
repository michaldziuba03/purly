import { Session } from '../../../../api/e2e/helpers';
import { CreateWorkspaceDto } from '../dto/create-workspace.dto';
import { UpdateWorkspaceDto } from '../dto/update-workspace.dto';

describe('PUT /workspaces/:workspaceId', () => {
  it('should successfully update workspace details', async () => {
    const session = new Session();
    await session.init();

    const bodyBefore: CreateWorkspaceDto = {
      name: 'Test before',
    };

    const result = await session.request
      .post('/workspaces')
      .send(bodyBefore)
      .expect(201);

    const workspaceId = result.body.id;

    const body: UpdateWorkspaceDto = {
      name: 'Test after',
    };

    const updatedResult = await session.request
      .patch(`/workspaces/${workspaceId}`)
      .send(body)
      .expect(200);

    expect(updatedResult.body.name).toEqual(body.name);
    expect(updatedResult.body.name).not.toEqual(bodyBefore.name);
  });
});
