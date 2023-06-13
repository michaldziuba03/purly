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

  async setArchived(alias: string): Promise<boolean> {
    const result = await this.linkCtx.update(
      { alias },
      {
        archived: true,
      }
    );

    return result.affected > 0;
  }

  async unsetArchived(alias: string): Promise<boolean> {
    const result = await this.linkCtx.update(
      { alias },
      {
        archived: false,
      }
    );

    return result.affected > 0;
  }
}
