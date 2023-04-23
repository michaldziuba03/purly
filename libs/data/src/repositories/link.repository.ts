import { BaseRepository } from './base.repository';
import { Link, LinkDocument } from '../schemas/link.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LinkRepository extends BaseRepository<LinkDocument, Link> {}
