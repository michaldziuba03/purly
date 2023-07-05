import { isURL } from 'class-validator';
import { isAfter } from 'date-fns';

export function createClientUrl(path: string) {
  const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

  return `${CLIENT_URL}${path}`;
}

export function getRefererHost(referer?: string) {
  if (!referer) {
    return;
  }

  if (!isURL(referer)) {
    return;
  }

  const url = new URL(referer);
  const hostname = url.hostname;
  if (hostname.startsWith('www.')) {
    return hostname.replace('www.', '');
  }

  return hostname;
}

export function isExpired(date: Date) {
  return isAfter(new Date(), date);
}
