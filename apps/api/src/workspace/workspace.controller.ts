import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { UserSession } from '../shared/user.decorator';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';

@Controller('workspaces')
@UseGuards(AuthenticatedGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class WorkspaceController {
  @Post()
  createWorkspace(
    @UserSession('id') userId: string,
    @Body() body: CreateWorkspaceDto
  ) {
    return;
  }

  @Get()
  getWorkspaces(@UserSession('id') userId: string) {
    return [{}];
  }

  @Get(':workspaceId')
  getWorkspace(
    @UserSession('id') userId: string,
    @Param('workspaceId') workspaceId: string
  ) {
    return {};
  }

  @Post(':workspaceId')
  updateWorkspace(
    @UserSession('id') userId: string,
    @Param('workspaceId') workspaceId: string,
    @Body() body: UpdateWorkspaceDto
  ) {
    return;
  }
}
