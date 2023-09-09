import { Injectable } from '@nestjs/common';
import { DatabaseContext, InjectDB } from '../../providers/database.provider';
import {
  LaunchpadElement,
  Launchpad,
  ElementInsert,
  LaunchpadInsert,
} from './launchpad.entity';
import { BaseRepository } from '../../base.repository';
import { launchpads, launchpadsElements } from './launchpad.schema';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class LaunchpadRepository extends BaseRepository<Launchpad> {
  constructor(@InjectDB() private readonly db: DatabaseContext) {
    super(Launchpad);
  }

  async create(data: LaunchpadInsert) {
    const result = await this.db
      .insert(launchpads)
      .values(data)
      .onConflictDoNothing({
        target: [launchpads.workspaceId],
      })
      .returning();

    return this.mapSingle(result);
  }

  async updateByWorkspace(workspaceId: string, data: Partial<Launchpad>) {
    const result = await this.db
      .update(launchpads)
      .set(data)
      .where(eq(launchpads.workspaceId, workspaceId))
      .returning();

    return this.mapSingle(result);
  }

  async findBySlug(slug: string) {
    const result = await this.db.query.launchpads.findFirst({
      where: eq(launchpads.slug, slug),
      with: {
        elements: {
          columns: { id: true, label: true },
          with: {
            link: {
              columns: { id: true, alias: true, url: true },
            },
          },
        },
      },
    });

    return this.mapSingle(result);
  }

  async findByWorkspace(workspaceId: string) {
    const result = await this.db.query.launchpads.findFirst({
      where: eq(launchpads.workspaceId, workspaceId),
      with: {
        elements: {
          columns: {
            id: true,
            label: true,
            redirect: true,
          },
        },
      },
    });

    return this.mapSingle(result);
  }

  async addElement(data: ElementInsert) {
    const result = await this.db
      .insert(launchpadsElements)
      .values(data)
      .returning();
    return result[0];
  }

  async deleteElement(elementId: string, workspaceId: string) {
    const result = await this.db
      .delete(launchpadsElements)
      .where(
        and(
          eq(launchpadsElements.id, elementId),
          eq(launchpadsElements.workspaceId, workspaceId)
        )
      );

    return result.rowCount > 0;
  }

  async updateElement(
    elementId: string,
    workspaceId: string,
    data: Partial<LaunchpadElement>
  ) {
    const result = await this.db
      .update(launchpadsElements)
      .set(data)
      .where(
        and(
          eq(launchpadsElements.id, elementId),
          eq(launchpadsElements.workspaceId, workspaceId)
        )
      )
      .returning();

    return result;
  }
}
