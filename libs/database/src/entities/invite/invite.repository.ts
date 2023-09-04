import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../base.repository';
import { Invite } from './invite.entity';
import { DatabaseContext, InjectDB } from '../../providers/database.provider';
import { invites } from './invite.schema';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class InviteRepository extends BaseRepository<Invite> {
  constructor(@InjectDB() private readonly db: DatabaseContext) {
    super(Invite);
  }

  async create(data: Invite) {
    const invite = await this.db
      .insert(invites)
      .values(data)
      .onConflictDoNothing({ target: [invites.email, invites.workspaceId] })
      .returning();

    return this.mapSingle(invite);
  }

  async findByWorkspaceId(workspaceId: string) {
    const result = await this.db.query.invites.findMany({
      where: eq(invites.workspaceId, workspaceId),
      limit: 50,
    });

    return this.mapMany(result);
  }

  async findByToken(inviteToken: string) {
    const result = await this.db.query.invites.findFirst({
      where: eq(invites.token, inviteToken),
      with: {
        workspace: {
          columns: {
            slug: true,
          },
        },
      },
    });

    return this.mapSingle(result);
  }

  async delete(email: string, workspaceId: string) {
    const result = await this.db
      .delete(invites)
      .where(
        and(eq(invites.email, email), eq(invites.workspaceId, workspaceId))
      );

    return result.rowCount > 0;
  }
}
