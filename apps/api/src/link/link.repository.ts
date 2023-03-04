import { EntityRepository } from '../database/entity.repository';
import { Link, LinkDocument } from './link.schema';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LinkRepository extends EntityRepository<LinkDocument> {
  constructor(
    @InjectModel(Link.name)
    private readonly linkModel: Model<LinkDocument>,
  ) {
    super(linkModel);
  }
}
