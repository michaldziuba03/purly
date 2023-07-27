export const CLICKS_QUEUE = 'clicks';

export interface IClickRecord {
  linkId: string;
  os: string;
  browser: string;
  country: string;
  referer: string;
}
