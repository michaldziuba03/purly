import { Injectable } from '@nestjs/common';
import { CLICKS_QUEUE, IClickRecord } from './clicks.jobs';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class ClicksProducer {
  constructor(
    @InjectQueue(CLICKS_QUEUE)
    private readonly clicksQueue: Queue
  ) {}

  recordClick(record: IClickRecord) {
    return this.clicksQueue.add('click', record);
  }
}
