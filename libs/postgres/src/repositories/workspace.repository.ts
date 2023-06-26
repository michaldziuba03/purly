import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Workspace } from '../entities/workspace.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WorkspaceRepository {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceCtx: Repository<Workspace>
  ) {}

  async create(data: Partial<Workspace>) {
    const _workspace = this.workspaceCtx.create(data);
    const result = await this.workspaceCtx.insert(_workspace);

    return {
      ...result.raw,
      ..._workspace,
    };
  }

  async update(
    filter: Partial<Workspace>,
    data: Partial<Workspace>
  ): Promise<boolean> {
    const _workspace = this.workspaceCtx.create(data);

    const result = await this.workspaceCtx.update(filter, _workspace);
    return result.affected > 0;
  }
}
