import { IsEnum, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { MaliciousType } from '@libs/data';

export class CreateReportDto {
  @IsUrl({
    require_tld: false,
  })
  url: string;

  @IsString()
  @Length(10, 250)
  @IsOptional()
  message: string;

  @IsEnum(MaliciousType)
  type: MaliciousType;
}
