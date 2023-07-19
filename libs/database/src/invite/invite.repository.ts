import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base.repository';
import { Invite } from './invite.entity';
import { DatabaseContext, InjectDB } from '../database.provider';
import { invites } from './invite.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class InviteRepository extends BaseRepository<Invite> {
  constructor(@InjectDB() private readonly db: DatabaseContext) {
    super(Invite);
  }

  async create(data: Invite) {
    const invite = await this.db.insert(invites).values(data).returning();

    return this.mapSingle(invite);
  }

  async findById(inviteId: string) {
    const result = await this.db.query.invites.findFirst({
      where: eq(invites.id, inviteId),
    });

    return this.mapSingle(result);
  }

  async delete(inviteId: string) {
    const result = await this.db
      .delete(invites)
      .where(eq(invites.id, inviteId));

    return result.rowCount > 0;
  }
}
