import { IsUUID } from 'class-validator';

export class StatsQueryDto {
  @IsUUID('4')
  linkId: string;
}
