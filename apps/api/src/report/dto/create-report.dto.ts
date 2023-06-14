import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateReportDto {
  @IsUrl({ require_tld: false })
  url: string;

  @IsString()
  @MaxLength(300)
  @IsNotEmpty()
  @IsOptional()
  message?: string;
}
