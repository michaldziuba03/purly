import { IsString, Length } from 'class-validator';
import { NAME_MAX, NAME_MIN } from '../account.constants';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccountDTO {
  @ApiProperty()
  @IsString()
  @Length(NAME_MIN, NAME_MAX)
  name: string;
}
