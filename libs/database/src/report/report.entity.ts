export enum AbuseType {
  BOTNETS = 'botnets',
  CSAM = 'csam',
  ILLEGAL_GOODS = 'illegal-goods',
  IMRERSONATTON = 'impersonation',
  MALWARE = 'malware',
  PHISHING = 'phishing',
  SPAM = 'spam',
  SPYWARE = 'spyware',
  TERRORISM = 'terrorism',
  VIOLENCE = 'violence',
}

export class Report {
  id: string;
  email: string;
  url: string;
  destination: string;
  isSolved: boolean;
  type: AbuseType;
}

export type InsertReport = Omit<Report, 'id'>;
