import { Module } from '@nestjs/common';
import { RangeService } from './range.service';

@Module({
  providers: [RangeService],
})
export class RangeModule {}
