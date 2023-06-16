export function createClientUrl(path: string) {
  const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

  return `${CLIENT_URL}${path}`;
}
