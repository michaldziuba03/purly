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
    const link = this.linkCtx.create(data);
    return this.linkCtx.save(link);
  }

  findByAlias(alias: string) {
    return this.linkCtx.findOneBy({ alias });
  }

  async delete(alias: string, userId: string): Promise<boolean> {
    const result = await this.linkCtx.delete({ alias, userId });
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
