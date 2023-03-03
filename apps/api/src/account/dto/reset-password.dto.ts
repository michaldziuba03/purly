import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { PASSWORD_MAX, PASSWORD_MIN } from '../account.constants';

export class ResetPasswordDTO {
  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty()
  @IsString()
  @Length(PASSWORD_MIN, PASSWORD_MAX)
  password: string;
}
