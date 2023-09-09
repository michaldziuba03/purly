import { Type } from 'class-transformer';

export class LaunchpadElement {
  id: string;
  workspaceId: string;
  label?: string;
  linkId: string;
  redirect: string;
}

export class Launchpad {
  workspaceId: string;
  slug: string; // editable identifier: website/m/identifier00
  name?: string;
  description?: string;
  bgColor?: string;
  @Type(() => LaunchpadElement)
  elements: LaunchpadElement[] = [];
}

export interface LaunchpadInsert {
  workspaceId: string;
  slug: string;
  name: string;
  description?: string;
}

export type ElementInsert = Omit<LaunchpadElement, 'id'>;
