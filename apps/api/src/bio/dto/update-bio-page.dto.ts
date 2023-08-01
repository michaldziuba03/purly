import {
  IsAlphanumeric,
  IsHexColor,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { Trim } from '../../shared/trim.transformer';

export class UpdateBioPageDto {
  @IsAlphanumeric('en-US')
  @Trim()
  @Length(3, 128)
  @IsOptional()
  identifier?: string;

  @IsString()
  @Length(3, 128)
  @IsOptional()
  name?: string;

  @IsHexColor()
  @IsOptional()
  bgColor?: string;

  @IsString()
  @MaxLength(300)
  @IsOptional()
  description?: string;
}
