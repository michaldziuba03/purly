import { Injectable } from '@nestjs/common';
import { Member } from './member.entity';
import { DatabaseContext, InjectDB } from '../../providers/database.provider';
import { BaseRepository } from '../../base.repository';
import { members } from './member.schema';
import { and, eq } from 'drizzle-orm';
import { MemberRole } from '@purly/shared';

@Injectable()
export class MemberRepository extends BaseRepository<Member> {
  constructor(@InjectDB() private readonly db: DatabaseContext) {
    super(Member);
  }

  async findMember(workspaceId: string, memberId: string) {
    const result = await this.db.query.members.findFirst({
      where: and(
        eq(members.workspaceId, workspaceId),
        eq(members.userId, memberId)
      ),
    });

    return this.mapSingle(result);
  }

  async findMembers(workspaceId: string) {
    const result = await this.db.query.members.findMany({
      columns: {
        workspaceId: true,
        role: true,
        createdAt: true,
      },
      where: eq(members.workspaceId, workspaceId),
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

    return this.mapMany(result);
  }

  async addMember(workspaceId: string, memberId: string, role?: MemberRole) {
    const result = await this.db.insert(members).values({
      userId: memberId,
      workspaceId,
      role: role,
    });

    return result.rowCount > 0;
  }

  async removeMember(workspaceId: string, memberId: string) {
    const result = await this.db
      .delete(members)
      .where(
        and(eq(members.workspaceId, workspaceId), eq(members.userId, memberId))
      );

    return result.rowCount > 0;
  }

  async changeMemberRole(
    workspaceId: string,
    memberId: string,
    newRole: MemberRole
  ) {
    const result = await this.db
      .update(members)
      .set({
        role: newRole,
      })
      .where(
        and(eq(members.workspaceId, workspaceId), eq(members.userId, memberId))
      );

    return result.rowCount > 0;
  }
}
