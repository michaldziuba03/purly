export class Invite {
  id: string;
  workspaceId: string;
  email: string;
  from: string;
  role: string;
  invitedAt?: Date;
}
