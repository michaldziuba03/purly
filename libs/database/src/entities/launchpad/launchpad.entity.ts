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
  title?: string;
  description?: string;
  @Type(() => LaunchpadElement)
  elements?: LaunchpadElement[];
  bgColor: string;
  btnColor: string;
  btnTextColor: string;
  textColor: string;
}

export interface LaunchpadInsert {
  workspaceId: string;
  slug: string;
  title: string;
  description?: string;
}

export type ElementInsert = Omit<LaunchpadElement, 'id'>;
