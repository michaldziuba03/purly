import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Link } from '../entities/link.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LinkRepository {
  constructor(
    @InjectRepository(Link)
    private readonly linkCtx: Repository<Link>
  ) {}

  create(data: Partial<Link>): Promise<Link> {
    return this.linkCtx.save(data);
  }

  async deleteByAlias(alias: string): Promise<boolean> {
    const result = await this.linkCtx.delete({ alias });
    return result.affected > 0;
  }

  async archiveLink(alias: string): Promise<boolean> {
    const result = await this.linkCtx.update(
      { alias },
      {
        isArchived: true,
      }
    );

    return result.affected > 0;
  }

  async unarchiveLink(alias: string): Promise<boolean> {
    const result = await this.linkCtx.update(
      { alias },
      {
        isArchived: false,
      }
    );

    return result.affected > 0;
  }
}
