import { Processor, WorkerHost } from '@nestjs/bullmq';
import { CLICKS_QUEUE, IClickRecord } from '@purly/queue';
import { Job } from 'bullmq';

@Processor(CLICKS_QUEUE)
export class ClicksProcessor extends WorkerHost {
  async process(job: Job<IClickRecord>) {
    console.log(job.data);
  }
}
