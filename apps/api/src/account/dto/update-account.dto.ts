import { IsString, Length } from 'class-validator';
import { NAME_MAX, NAME_MIN } from '../account.constants';
import { Trim } from '../../shared/utils';

export class UpdateAccountDTO {
  @IsString()
  @Length(NAME_MIN, NAME_MAX)
  @Trim()
  name: string;
}
