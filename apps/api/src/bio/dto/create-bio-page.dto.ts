import {
  IsAlphanumeric,
  IsHexColor,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { Trim } from '../../shared/trim.transformer';

export class CreateBioPageDto {
  @IsAlphanumeric('en-US')
  @Trim()
  @Length(3, 128)
  identifier: string;

  @IsString()
  @Length(3, 128)
  name: string;

  @IsHexColor()
  @IsOptional()
  bgColor?: string;

  @IsString()
  @MaxLength(300)
  @IsOptional()
  description?: string;
}
