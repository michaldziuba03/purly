import axios from './axios';

export async function getSessionUser(cookiesHeader?: string) {
  try {
    const result = await axios.get('/users/me', {
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
