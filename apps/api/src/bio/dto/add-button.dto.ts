import { IsString, IsUrl, Length } from 'class-validator';

export class AddButtonDto {
  @IsUrl()
  url: string;

  @IsString()
  @Length(1, 100)
  label: string;
}
