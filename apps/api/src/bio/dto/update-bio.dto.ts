import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateBioDto {
  @IsString()
  @MaxLength(100)
  @IsOptional()
  title?: string;

  @IsString()
  @MaxLength(700)
  @IsOptional()
  description?: string;
}
