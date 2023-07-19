import { Injectable } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { WorkspaceRepository } from '@purly/database';

interface IGetMembersCommand {
  workspaceId: string;
}

@Injectable()
export class GetMembers implements Usecase<IGetMembersCommand> {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  execute(command: IGetMembersCommand) {
    return this.workspaceRepository.findMembers(command.workspaceId);
  }
}
