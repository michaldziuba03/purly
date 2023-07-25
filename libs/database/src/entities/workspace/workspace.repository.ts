import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../base.repository';
import { DatabaseContext, InjectDB } from '../../providers/database.provider';
import { InsertWorkspace, Workspace } from './workspace.entity';
import { workspaces } from './workspace.schema';
import { eq, sql } from 'drizzle-orm';
import { members } from '../member/member.schema';

@Injectable()
export class WorkspaceRepository extends BaseRepository<Workspace> {
  constructor(@InjectDB() private readonly db: DatabaseContext) {
    super(Workspace);
  }

  async countByMemberId(memberId: string, limit = 10) {
    const result = await this.db
      .select({
        count: sql<number>`count(user_id)`,
      })
      .from(members)
      .where(eq(members.userId, memberId))
      .limit(limit);

    const workspaces = result[0] || { count: 0 };

    return workspaces.count;
  }

  async findById(workspaceId: string) {
    const result = await this.db.query.workspaces.findFirst({
      where: eq(workspaces.id, workspaceId),
    });

    return this.mapSingle(result);
  }

  async findByMember(memberId: string, limit = 10) {
    const workspaces = await this.db.query.members.findMany({
      where: eq(members.userId, memberId),
      columns: {},
      limit,
      with: {
        workspace: true,
      },
    });

    return this.mapMany(workspaces.map((workspace) => workspace.workspace));
  }

  async create(data: InsertWorkspace) {
    const result = await this.db
      .insert(workspaces)
      .values({
        name: data.name,
      })
      .returning();

    return this.mapSingle(result);
  }

  async updateById(workspaceId: string, data: Partial<Workspace>) {
    const result = await this.db
      .update(workspaces)
      .set(data)
      .where(eq(workspaces.id, workspaceId))
      .returning();

    return this.mapSingle(result);
  }

  async updatePlan(billingId: string, plan: string) {
    const result = await this.db
      .update(workspaces)
      .set({ plan })
      .where(eq(workspaces.billingId, billingId));

    return result.rowCount > 0;
  }
}
