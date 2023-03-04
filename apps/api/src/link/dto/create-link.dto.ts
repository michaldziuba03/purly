import { IsUrl } from 'class-validator';

export class CreateLinkDTO {
  @IsUrl()
  url: string;
}
