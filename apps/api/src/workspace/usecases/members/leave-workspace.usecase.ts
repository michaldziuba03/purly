import { Injectable } from '@nestjs/common';
import { Usecase } from '../../../shared/base.usecase';

interface ILeaveWorkspace {
  userId: string;
  workspaceId: string;
}

@Injectable()
export class LeaveWorkspace implements Usecase<ILeaveWorkspace> {
  execute(command: ILeaveWorkspace) {
    return command;
  }
}
