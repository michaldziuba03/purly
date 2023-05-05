import { BaseRepository } from './base.repository';
import { Link, LinkDocument } from '../schemas/link.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class LinkRepository extends BaseRepository<LinkDocument, Link> {
  constructor( @InjectModel(Link.name) linkModel: Model<LinkDocument>,) {
    super(linkModel, Link);
  }
}
