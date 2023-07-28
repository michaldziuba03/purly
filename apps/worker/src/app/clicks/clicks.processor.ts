import { Processor, WorkerHost } from '@nestjs/bullmq';
import { CLICKS_QUEUE, IClickRecord } from '@purly/queue';
import { Job } from 'bullmq';
import { RecordJob } from '../../record-job.decorator';

@Processor(CLICKS_QUEUE)
export class ClicksProcessor extends WorkerHost {
  @RecordJob()
  async process(job: Job<IClickRecord>) {
    // TODO: add click record to Clickhouse database
    throw new Error('Not implemented');
  }
}
