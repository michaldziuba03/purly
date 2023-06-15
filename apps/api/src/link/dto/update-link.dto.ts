import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { Trim } from '../../shared/trim.transformer';
import { LINK_NAME_MAX } from '../link.constants';

export class UpdateLinkDto {
  @IsUrl()
  @IsOptional()
  url?: string;

  @IsString()
  @MaxLength(LINK_NAME_MAX)
  @Trim()
  @IsOptional()
  name?: string;

  @IsBoolean()
  @IsOptional()
  isArchived?: boolean;
}
