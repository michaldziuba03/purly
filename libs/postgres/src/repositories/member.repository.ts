import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member, Permissions } from '../entities/member.entity';

@Injectable()
export class MemberRepository {
  constructor(
    @InjectRepository(Member)
    private readonly memberCtx: Repository<Member>
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

  async findMembersByWorkspace(workspaceId: string) {
    const members = await this.memberCtx.find({
      where: { workspaceId },
      relations: { user: true },
      take: 30,
    });

    return members;
  }
}
