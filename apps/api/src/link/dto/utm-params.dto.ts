import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

const PARAM_MAX = 2000;

export class UtmParamsDto {
  @IsBoolean()
  @IsOptional()
  enableUtm?: boolean;

  @IsString()
  @IsNotEmpty()
  @MaxLength(PARAM_MAX)
  @IsOptional()
  utmSource?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(PARAM_MAX)
  @IsOptional()
  utmMedium?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(PARAM_MAX)
  @IsOptional()
  utmCampaign?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(PARAM_MAX)
  @IsOptional()
  utmTerm?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(PARAM_MAX)
  @IsOptional()
  utmContent?: string;
}
