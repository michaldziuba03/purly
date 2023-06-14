import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class GetLinksQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 30;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  page?: number;
}
