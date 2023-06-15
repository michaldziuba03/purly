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

  async create(data: Partial<Link>): Promise<Link> {
    const result = await this.linkCtx.insert(data);
    const rawResult = result.raw[0];
    if (!rawResult) {
      return;
    }

    return this.linkCtx.create({
      alias: rawResult['alias'],
      url: rawResult['url'],
      name: rawResult['name'],
      isArchived: rawResult['is_archived'],
      clicks: rawResult['clicks'],
      createdAt: rawResult['created_at'],
      updatedAt: rawResult['updated_at'],
      ...data,
    });
  }

  findByAlias(alias: string) {
    return this.linkCtx.findOneBy({ alias });
  }

  async updateOne(alias: string, userId: string, data: Partial<Link>) {
    const result = await this.linkCtx.update(
      {
        alias,
        userId,
      },
      data
    );

    return result.affected > 0;
  }

  async delete(alias: string, userId: string): Promise<boolean> {
    const result = await this.linkCtx.delete({ alias, userId });
    return result.affected > 0;
  }

  exists(alias: string) {
    return this.linkCtx.exist({ where: { alias } });
  }

  isDuplicatedAliasError(err: any) {
    if (!err) {
      return false;
    }

    if (!err.code && !err.detail) {
      return false;
    }

    if (err.code !== '23505') {
      return false;
    }

    if (!err.detail.includes('alias')) {
      return false;
    }

    return true;
  }
}
