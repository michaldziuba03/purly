import {
  IsDateString,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { Trim } from '../../shared/trim.transformer';
import { LINK_NAME_MAX } from '../link.constants';
import { UtmParamsDto } from './utm-params.dto';

export class CreateLinkDto extends UtmParamsDto {
  @IsUrl()
  url: string;

  @IsString()
  @MaxLength(LINK_NAME_MAX)
  @Trim()
  @IsOptional()
  name?: string;

  @IsDateString()
  @IsOptional()
  expiresAt?: string;

  @IsUrl({
    require_protocol: false,
    allow_query_components: false,
    allow_trailing_dot: false,
    disallow_auth: true,
  })
  @IsOptional()
  domain?: string;

  @IsUrl()
  @IsOptional()
  iosRedirect?: string;

  @IsUrl()
  @IsOptional()
  androidRedirect?: string;
}
