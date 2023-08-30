import client from './client';

export async function initUpload(format: string) {
  const result = await client.post('/uploads', {
    format,
  });

  return result.data;
}

export async function uploadToS3(url: string, data: object) {
  const result = await client.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return result.data;
}
