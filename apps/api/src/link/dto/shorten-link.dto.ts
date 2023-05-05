import { IsDefined, IsUrl } from 'class-validator';

export class ShortenLinkDto {
  @IsUrl()
  @IsDefined()
  url: string;
}
