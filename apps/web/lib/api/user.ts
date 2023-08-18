import client from './client';

export async function getSessionUser(cookiesHeader?: string) {
  try {
    const result = await client.get('/users/me', {
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
