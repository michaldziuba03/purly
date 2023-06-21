import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bio, BioBlock } from '../entities/bio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BioRepository {
  constructor(
    @InjectRepository(Bio)
    private readonly bioCtx: Repository<Bio>,
    @InjectRepository(BioBlock)
    private readonly bioBlockCtx: Repository<BioBlock>
  ) {}

  exists(name: string) {
    return this.bioCtx.exist({ where: { name } });
  }

  async create(name: string, userId: string) {
    const result = await this.bioCtx.insert({
      name,
      userId,
    });

    if (!result) return;
    return this.bioCtx.create(result.raw[0]);
  }

  async getPageByName(name: string) {
    const page = await this.bioCtx.findOneBy({ name });
    if (!page) {
      return;
    }

    const blocks = await this.bioBlockCtx.find({
      where: { bioId: page.id },
      take: 20,
    });

    return {
      ...page,
      blocks,
    };
  }
}
