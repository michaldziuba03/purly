import { IsOptional, IsString, IsUrl } from 'class-validator';
import { Trim } from '../../shared/trim.transformer';

export class UpdateLinkDto {
  @IsUrl()
  @IsOptional()
  url?: string;

  @IsString()
  @Trim()
  @IsOptional()
  name?: string;
}
