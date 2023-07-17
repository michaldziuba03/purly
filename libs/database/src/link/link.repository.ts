import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base.repository';
import { InsertLink, Link } from './link.entity';
import { DatabaseContext, InjectDB } from '../database.provider';
import { links } from './link.schema';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class LinkRepository extends BaseRepository<Link> {
  constructor(
    @InjectDB()
    private readonly db: DatabaseContext
  ) {
    super(Link);
  }

  async findOneByAlias(alias: string) {
    const link = await this.db.query.links.findFirst({
      where: eq(links.alias, alias),
    });

    return this.mapSingle(link);
  }

  async findOne(linkId: string, workspaceId: string) {
    const link = await this.db.query.links.findFirst({
      where: and(eq(links.id, linkId), eq(links.workspaceId, workspaceId)),
    });

    return this.mapSingle(link);
  }

  async create(data: InsertLink) {
    const result = await this.db.insert(links).values(data).returning();

    return this.mapSingle(result);
  }

  async update(linkId: string, workspaceId: string, data: Partial<Link>) {
    const result = await this.db
      .update(links)
      .set(data)
      .where(and(eq(links.id, linkId), eq(links.workspaceId, workspaceId)))
      .returning();

    return this.mapSingle(result);
  }

  async delete(linkId: string, workspaceId: string) {
    const result = await this.db
      .delete(links)
      .where(and(eq(links.id, linkId), eq(links.workspaceId, workspaceId)));

    return result.rowCount > 0;
  }

  async findByWorkspace(workspaceId: string) {
    const result = await this.db.query.links.findMany({
      where: eq(links.workspaceId, workspaceId),
      limit: 50,
    });

    return this.mapMany(result);
  }
}
