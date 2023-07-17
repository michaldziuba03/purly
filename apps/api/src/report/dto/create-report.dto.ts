import { AbuseType } from '@purly/database';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateReportDto {
  @IsUrl({ require_tld: false })
  url: string;

  @IsEmail()
  email: string;

  @IsEnum(AbuseType)
  type: AbuseType;

  @IsString()
  @MaxLength(300)
  @IsNotEmpty()
  @IsOptional()
  message?: string;
}
