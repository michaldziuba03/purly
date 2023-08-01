import { Type } from 'class-transformer';

export class BioElement {
  id: string;
  workspaceId: string;
  label?: string;
  linkId: string;
  redirect: string;
}

export class BioPage {
  workspaceId: string;
  identifier: string; // editable identifier: website/m/identifier00
  name?: string;
  description?: string;
  bgColor?: string;
  @Type(() => BioElement)
  elements: BioElement[];
}

export interface BioInsert {
  workspaceId: string;
  identifier: string;
  description: string;
}

export type ElementInsert = Omit<BioElement, 'id'>;
