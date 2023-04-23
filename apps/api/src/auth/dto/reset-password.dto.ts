import { IsString, Length } from 'class-validator';
import { PASSWORD_MAX, PASSWORD_MIN } from '../../account/account.constants';
import { Trim } from '../../shared/utils';

export class ResetPasswordDTO {
  @IsString()
  @Trim()
  token: string;

  @IsString()
  @Length(PASSWORD_MIN, PASSWORD_MAX)
  password: string;
}
