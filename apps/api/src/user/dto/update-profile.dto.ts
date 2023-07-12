import { IsString, Length } from 'class-validator';
import { NAME_MAX, NAME_MIN } from '../user.constants';
import { Trim } from '../../shared/trim.transformer';

export class UpdateProfileDto {
  @IsString()
  @Trim()
  @Length(NAME_MIN, NAME_MAX)
  username: string;
}
