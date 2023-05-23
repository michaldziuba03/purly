export const CLICK_QUEUE = 'clicks';

export interface RecordClickPayload {
  ua: string;
  ip: string;
  referer: string;
  alias: string;
}
