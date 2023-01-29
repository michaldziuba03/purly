import { EntityRepository } from '../database/entity.repository';
import { StripeEvent, StripeEventDocument } from './stripe-event.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class StripeEventRepository extends EntityRepository<StripeEventDocument> {
  constructor(
    @InjectModel(StripeEvent.name) eventModel: Model<StripeEventDocument>,
  ) {
    super(eventModel);
  }
}
