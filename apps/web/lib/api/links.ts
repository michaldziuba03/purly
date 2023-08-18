import client from './client';

export async function getLinks(workspaceId: string) {
  const result = await client.get(`/workspaces/${workspaceId}/links`);

  return result.data;
}
