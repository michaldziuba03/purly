export const MAIL_QUEUE = 'mail';

export enum MailJobs {
  Reset = 'reset',
  Verification = 'verification',
}

export interface ResetPasswordPayload {
  email: string;
  name: string;
  ip: string;
  agent: string;
  link: string;
}

export interface VerificationPayload {
  email: string;
  name: string;
  link: string;
}
