import { Injectable } from '@nestjs/common';
import { DatabaseContext, InjectDB } from '../../providers/database.provider';
import { BioElement, BioInsert, BioPage, ElementInsert } from './bio.entity';
import { BaseRepository } from '../../base.repository';
import { bioElements, bioPages } from './bio.schema';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class BioRepository extends BaseRepository<BioPage> {
  constructor(@InjectDB() private readonly db: DatabaseContext) {
    super(BioPage);
  }

  async create(data: BioInsert) {
    const result = await this.db
      .insert(bioPages)
      .values(data)
      .onConflictDoNothing({
        target: [bioPages.workspaceId],
      })
      .returning();

    return this.mapSingle(result);
  }

  async updateByWorkspace(workspaceId: string, data: Partial<BioPage>) {
    const result = await this.db
      .update(bioPages)
      .set(data)
      .where(eq(bioPages.workspaceId, workspaceId))
      .returning();

    return this.mapSingle(result);
  }

  async findByIdentifier(identifier: string) {
    const result = await this.db.query.bioPages.findFirst({
      where: eq(bioPages.identifier, identifier),
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
    const result = await this.db.query.bioPages.findFirst({
      where: eq(bioPages.workspaceId, workspaceId),
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

  async addElement(data: ElementInsert) {
    const result = await this.db.insert(bioElements).values(data).returning();
    return result[0];
  }

  async deleteElement(elementId: string, workspaceId: string) {
    const result = await this.db
      .delete(bioElements)
      .where(
        and(
          eq(bioElements.id, elementId),
          eq(bioElements.workspaceId, workspaceId)
        )
      );

    return result.rowCount > 0;
  }

  async updateElement(
    elementId: string,
    workspaceId: string,
    data: Partial<BioElement>
  ) {
    const result = await this.db
      .update(bioElements)
      .set(data)
      .where(
        and(
          eq(bioElements.id, elementId),
          eq(bioElements.workspaceId, workspaceId)
        )
      )
      .returning();

    return result;
  }
}
