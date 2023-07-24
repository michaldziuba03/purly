import { Injectable } from '@nestjs/common';
import { MemberRole } from '@purly/shared';
import { BaseRepository } from '../../base.repository';
import { DatabaseContext, InjectDB } from '../../providers/database.provider';
import { InsertWorkspace, Workspace } from './workspace.entity';
import { workspaces, workspacesMembers } from './workspace.schema';
import { and, eq, sql } from 'drizzle-orm';

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
      .from(workspacesMembers)
      .where(eq(workspacesMembers.userId, memberId))
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
    const workspaces = await this.db.query.workspacesMembers.findMany({
      where: eq(workspacesMembers.userId, memberId),
      columns: {
        createdAt: true,
        role: true,
      },
      limit,
      with: {
        workspace: true,
      },
    });

    return workspaces;
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

  async findMember(workspaceId: string, memberId: string) {
    const result = await this.db.query.workspacesMembers.findFirst({
      where: and(
        eq(workspacesMembers.workspaceId, workspaceId),
        eq(workspacesMembers.userId, memberId)
      ),
    });

    return result;
  }

  async findMembers(workspaceId: string) {
    const result = await this.db.query.workspacesMembers.findMany({
      columns: {
        workspaceId: true,
        role: true,
        createdAt: true,
      },
      where: eq(workspacesMembers.workspaceId, workspaceId),
      with: {
        user: {
          columns: {
            id: true,
            username: true,
            picture: true,
          },
        },
      },
      limit: 100,
    });

    return result;
  }

  async addMember(workspaceId: string, memberId: string, role?: MemberRole) {
    const result = await this.db.insert(workspacesMembers).values({
      userId: memberId,
      workspaceId,
      role: role,
    });

    return result.rowCount > 0;
  }

  async removeMember(workspaceId: string, memberId: string) {
    const result = await this.db
      .delete(workspacesMembers)
      .where(
        and(
          eq(workspacesMembers.workspaceId, workspaceId),
          eq(workspacesMembers.userId, memberId)
        )
      );

    return result.rowCount > 0;
  }

  async changeMemberRole(
    workspaceId: string,
    memberId: string,
    newRole: MemberRole
  ) {
    const result = await this.db
      .update(workspacesMembers)
      .set({
        role: newRole,
      })
      .where(
        and(
          eq(workspacesMembers.workspaceId, workspaceId),
          eq(workspacesMembers.userId, memberId)
        )
      );

    return result.rowCount > 0;
  }
}
