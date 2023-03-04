import { IsEnum, IsString, IsUrl } from 'class-validator';
import { MaliciousType } from '../report.schema';

export class CreateReportDTO {
  @IsUrl()
  url: string;

  @IsString()
  message: string;

  @IsEnum(MaliciousType)
  type: MaliciousType;
}
