import { IsString, IsUrl, Length } from 'class-validator';

export class AddElementDto {
  @IsString()
  @Length(1, 100)
  label: string;

  @IsUrl()
  url: string;
}
