import { IsEmail, IsString, Length } from 'class-validator';
import {
  NAME_MAX,
  NAME_MIN,
  PASSWORD_MAX,
  PASSWORD_MIN,
} from '../account.constants';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDTO {
  @ApiProperty()
  @IsString()
  @Length(NAME_MIN, NAME_MAX)
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(PASSWORD_MIN, PASSWORD_MAX)
  password: string;
}
