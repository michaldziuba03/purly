import { IsOptional, IsString } from 'class-validator';

export class AddElementDto {
  @IsString()
  label: string;

  @IsString()
  @IsOptional()
  linkId?: string;

  @IsString()
  @IsOptional()
  url?: string;
}
