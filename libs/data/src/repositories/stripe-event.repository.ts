import { BaseRepository } from './base.repository';
import { Injectable } from '@nestjs/common';
import { StripeEvent, StripeEventDocument } from '../schemas/stripe-event.schema';

@Injectable()
export class StripeEventRepository extends BaseRepository<StripeEventDocument, StripeEvent> {}
