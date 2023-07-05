import { Injectable } from '@nestjs/common';
import { Usecase } from '../../shared/base.usecase';
import { MemberRepository } from '@purly/postgres';
import { WORKSPACES_LIMIT } from '../workspace.constants';

interface IGetWorkspacesCommand {
  userId: string;
}

@Injectable()
export class GetWorkspaces implements Usecase<IGetWorkspacesCommand> {
  constructor(private readonly memberRepository: MemberRepository) {}

  execute(command: IGetWorkspacesCommand) {
    return this.memberRepository.findWorkspaces(
      command.userId,
      WORKSPACES_LIMIT
    );
  }
}
