import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bio } from '../entities/bio.entity';
import { Repository } from 'typeorm';
import { BioBlock, BlockTypes } from '../entities/bio-block.entity';

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

  updateByUser(userId: string, data: Partial<Bio>) {
    return this.bioCtx.update({ userId }, data);
  }

  async getPageByName(name: string) {
    const page = await this.bioCtx.findOne({
      where: { name },
      relations: { blocks: true },
    });

    return page;
  }

  async getBioIdByUser(userId: string): Promise<string> {
    const bio = await this.bioCtx.findOne({
      where: { userId },
      select: ['id'],
    });

    if (!bio) return;
    return bio.id;
  }

  async getPageByUser(userId: string) {
    const page = await this.bioCtx.findOne({
      where: { userId },
      relations: { blocks: true },
    });

    return page;
  }

  async addButton(blockData: Partial<BioBlock>) {
    const _block = this.bioBlockCtx.create(blockData);
    _block.type = BlockTypes.BUTTON;

    const block = await this.bioBlockCtx.insert(_block);

    return block.raw[0];
  }

  async deleteButton(blockId: string, bioId: string): Promise<boolean> {
    const result = await this.bioBlockCtx.delete({
      id: blockId,
      bioId,
    });

    return result.affected > 0;
  }

  deleteBio(userId: string) {
    return this.bioCtx.delete({
      userId,
    });
  }

  isOwner(bioId: string, userId: string) {
    return this.bioCtx.exist({
      where: { userId, id: bioId },
    });
  }
}
