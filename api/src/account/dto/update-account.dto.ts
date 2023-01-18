import { IsString, Length } from 'class-validator';
import { NAME_MAX, NAME_MIN } from '../account.constants';

export class UpdateAccountDTO {
  @IsString()
  @Length(NAME_MIN, NAME_MAX)
  name: string;
}
