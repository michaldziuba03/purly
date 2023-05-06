import { Injectable } from '@nestjs/common';
import { RangeService } from '../range/range.service';
import { Config } from '../config/config';
import { LinkRepository } from '@libs/data';
import Hashids from 'hashids';

@Injectable()
export class LinkService {
  private readonly hashids: Hashids;
  constructor(
    private readonly rangeService: RangeService,
    private readonly linkRepository: LinkRepository,
    private readonly config: Config,
  ) {
    this.hashids = new Hashids(config.aliasSalt);
  }

  async shortenUrl(url: string, userId: string) {
    const sequence = await this.rangeService.next();
    const alias = this.hashids.encode(sequence);

    return this.linkRepository.create({
      url,
      userId,
      sequence,
      alias,
    });
  }

  getLinksByUser(userId: string, limit: number, page?: string) {
    return this.linkRepository.findPaginatedById(
      {
        userId,
      },
      limit,
      page,
    );
  }

  async getLink(alias: string) {
    return this.linkRepository.findOne({ alias });
  }

  async deleteLink(alias: string, userId: string) {
    return this.linkRepository.deleteOne({ alias, userId });
  }
}
