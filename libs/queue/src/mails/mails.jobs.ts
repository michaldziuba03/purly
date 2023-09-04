export const MAILS_QUEUE = 'mails';

export enum MailJobs {
  VERIFICATION = 'verification',
  RESET_PASSWORD = 'reset-password',
  REPORT = 'report',
  INVITE = 'invite',
}

export interface IResetPasswordEmail {
  email: string;
  username: string;
  resetLink: string;
}

export interface IReportEmail {
  email: string;
  destinationUrl: string;
  linkId: string;
}

export interface IVerificationEmail {
  email: string;
  username: string;
  verificationLink: string;
}

export interface IInviteEmail {
  email: string;
  token: string;
  workspaceId: string;
}
