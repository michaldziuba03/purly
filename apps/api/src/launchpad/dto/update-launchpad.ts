import { IsOptional, IsString, Length, MaxLength } from 'class-validator';
import { ColorsDto } from './colors.dto';

export class UpdateLaunchpadDto extends ColorsDto {
  @IsString()
  @Length(3, 64)
  title: string;

  @IsString()
  @MaxLength(250)
  @IsOptional()
  description?: string;
}
