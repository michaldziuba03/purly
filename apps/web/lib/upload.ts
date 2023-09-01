import { initUpload, uploadToS3 } from './api/upload';

function getFormat(type: string): string {
  switch (type) {
    case 'image/png':
      return 'png';
    case 'image/jpg':
      return 'jpg';
    case 'image/jpeg':
      return 'jpeg';
    default:
      throw new Error('Unsupported format');
  }
}

export async function uploadFile(file: File): Promise<string> {
  const format = getFormat(file.type);
  const signed = await initUpload(format);
  const form = new FormData();

  Object.entries(signed.fields).forEach(([field, value]) => {
    form.append(field, value as string);
  });

  form.append('file', file);
  await uploadToS3(signed.url, form);

  return signed.file;
}
