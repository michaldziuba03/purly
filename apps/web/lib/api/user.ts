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

export async function setUserAvatar(file: string) {
  const result = await client.put('/users/me/picture', {
    file,
  });

  return result.data;
}
