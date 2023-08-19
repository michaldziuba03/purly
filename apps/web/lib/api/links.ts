import client from './client';

export async function getLinks(workspaceId: string) {
  const result = await client.get(`/workspaces/${workspaceId}/links`);

  return result.data;
}

export async function deleteLink(workspaceId: string, linkId: string) {
  const result = await client.delete(
    `/workspaces/${workspaceId}/links/${linkId}`
  );

  return result.data;
}

export async function createLink(workspaceId: string, data: object) {
  const result = await client.post(`/workspaces/${workspaceId}/links`, data);
  return result.data;
}
