import { IsEmail, IsString, Length } from 'class-validator';
import {
  NAME_MAX,
  NAME_MIN,
  PASSWORD_MAX,
  PASSWORD_MIN,
} from '../../account/account.constants';
import { Trim } from '../../shared/utils';

export class RegisterDTO {
  @IsEmail()
  email: string;

  @IsString()
  @Length(NAME_MIN, NAME_MAX)
  @Trim()
  name: string;

  @IsString()
  @Length(PASSWORD_MIN, PASSWORD_MAX)
  password: string;
}
