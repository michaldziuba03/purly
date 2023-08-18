import client from './client';

export async function getMembers(workspaceId: string) {
  const result = await client.get(`/workspaces/${workspaceId}/members`);
  return result.data;
}
