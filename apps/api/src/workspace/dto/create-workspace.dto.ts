import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { WORKSPACE_NAME_MAX } from '@purly/shared';

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(WORKSPACE_NAME_MAX)
  name: string;

  @IsString()
  slug: string;
}
