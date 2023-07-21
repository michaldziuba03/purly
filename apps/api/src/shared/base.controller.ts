import { Controller } from '@nestjs/common';
import { join } from 'path/posix';

// Workspace is root of most resoruces in this application.
// TODO: make it accept object options as well
export const BaseController = (basePath: string) =>
  Controller(join('workspaces/:workspaceId', basePath));
