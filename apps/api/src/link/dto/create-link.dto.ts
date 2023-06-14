import { IsOptional, IsString, IsUrl } from 'class-validator';
import { Trim } from '../../shared/trim.transformer';

export class CreateLinkDto {
  @IsUrl()
  url: string;

  @IsString()
  @Trim()
  @IsOptional()
  name?: string;
}
