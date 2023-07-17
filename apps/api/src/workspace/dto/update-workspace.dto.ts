import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { WORKSPACE_NAME_MAX } from '../workspace.constants';

export class UpdateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(WORKSPACE_NAME_MAX)
  @IsOptional()
  name?: string;
}
