import { IsOptional, IsString, Length, MaxLength } from 'class-validator';

export class CreateLaunchpadDto {
  @IsString()
  @Length(3, 64)
  slug: string;

  @IsString()
  @Length(3, 64)
  @IsOptional()
  name: string;

  @IsString()
  @MaxLength(250)
  @IsOptional()
  description?: string;
}
