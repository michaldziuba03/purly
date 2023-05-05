import { IsDefined, IsString, Length } from 'class-validator';
import { Trim } from '../../shared/utils';

export class VerifyAccountDto {
  @IsString()
  @IsDefined()
  @Trim()
  @Length(10, 200)
  token: string;
}
