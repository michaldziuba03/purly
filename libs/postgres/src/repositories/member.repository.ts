import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Member, Permissions } from '../entities/member.entity';

@Injectable()
export class MemberRepository {
  constructor(
    @InjectRepository(Member)
    private readonly memberCtx: Repository<Member>,
    private readonly db: DataSource
  ) {}

  async createOwner(workspaceId: string, userId: string) {
    await this.memberCtx.insert({
      permission: Permissions.OWNER,
      userId,
      workspaceId,
    });
  }

  async addMember(workspaceId: string, userId: string) {
    await this.memberCtx.insert({
      permission: Permissions.MEMBER,
      userId,
      workspaceId,
    });
  }

  async removeMember(workspaceId: string, userId: string) {
    await this.memberCtx.delete({
      userId,
      workspaceId,
    });
  }

  async deleteAllMembers(workspaceId: string): Promise<boolean> {
    return this.db.transaction(async (trx) => {
      const result = await trx.delete(Member, {
        workspaceId,
      });

      return result.affected > 0;
    });
  }

  async findMembersByWorkspace(workspaceId: string) {
    const members = await this.memberCtx.find({
      where: { workspaceId },
      relations: { user: true },
      take: 50,
    });

    return members;
  }

  async findWorkspaces(userId: string) {
    const workspaces = await this.memberCtx.find({
      where: { userId },
      relations: { workspace: true },
      take: 50,
    });

    return workspaces;
  }

  findMember(memberId: string, workspaceId: string) {
    return this.memberCtx.findOneBy({
      userId: memberId,
      workspaceId,
    });
  }

  async changePermission(
    memberId: string,
    workspaceId: string,
    permission: Permissions
  ): Promise<boolean> {
    const result = await this.memberCtx.update(
      {
        userId: memberId,
        workspaceId,
      },
      {
        permission,
      }
    );

    return result.affected > 0;
  }

  async banMember(memberId: string, workspaceId: string) {
    const result = await this.memberCtx.update(
      {
        userId: memberId,
        workspaceId,
      },
      {
        bannedUntil: new Date(Date.now() + 24 * 3600 * 1000),
      }
    );

    return result.affected > 0;
  }
}
