import { Processor, WorkerHost } from '@nestjs/bullmq';
import { CLICKS_QUEUE, IClickRecord } from '@purly/queue';
import { Job } from 'bullmq';
import { format } from 'date-fns';
import { RecordJob } from '../../record-job.decorator';
import { AnalyticsService } from '@purly/analytics';

@Processor(CLICKS_QUEUE)
export class ClicksProcessor extends WorkerHost {
  constructor(private readonly analyticsService: AnalyticsService) {
    super();
  }

  @RecordJob()
  async process(job: Job<IClickRecord>) {
    const data = job.data;

    await this.analyticsService.recordClick({
      browser: data.browser,
      country: data.country,
      linkId: data.linkId,
      os: data.os,
      referer: data.referer,
      timestamp: format(new Date(), 'yyyy-MM-dd'),
    });
  }
}
