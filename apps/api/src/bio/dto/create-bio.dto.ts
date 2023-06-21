import { IsString, Length } from 'class-validator';

export class CreateBioDto {
  @IsString()
  @Length(2, 50)
  name: string;
}
