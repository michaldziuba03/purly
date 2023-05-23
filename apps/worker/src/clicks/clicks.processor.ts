import { Processor, WorkerHost } from '@nestjs/bullmq';
import { CLICK_QUEUE, RecordClickPayload } from '@libs/jobs';
import { Job } from 'bullmq';
import { ClicksService } from './clicks.service';

@Processor(CLICK_QUEUE)
export class ClicksProcessor extends WorkerHost {
  constructor(private readonly clicksService: ClicksService) {
    super();
  }

  async process(job: Job<RecordClickPayload>) {
    console.log('Processing click...');
    try {
      await this.clicksService.recordClick(job.data.alias);
    } catch (err) {
      console.log(err);
      throw err;
    }
    console.log('Processed');
  }
}
