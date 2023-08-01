import { IsString, Length } from 'class-validator';

export class UpdateElementDto {
  @IsString()
  @Length(1, 100)
  label: string;
}
