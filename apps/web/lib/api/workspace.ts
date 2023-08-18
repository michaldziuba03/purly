import client from './client';

export async function getSessionWorkspaces(cookiesHeader?: string) {
  try {
    const result = await client.get('/workspaces', {
      withCredentials: true,
      headers: {
        Cookie: cookiesHeader,
      },
    });

    return result.data;
  } catch {
    return;
  }
}

export function createWorkspace(data: any) {
  return client.post('/workspaces', data);
}
