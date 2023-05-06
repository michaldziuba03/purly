import { IsInt, IsMongoId, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginatedLinksQueryDto {
  @IsMongoId()
  @IsOptional()
  page?: string;

  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(50)
  limit = 30;
}
