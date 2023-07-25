export class Workspace {
  id: string;
  name: string;
  plan: string;
  billingId?: string;
  billingEmail?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class InsertWorkspace {
  name: string;
}
