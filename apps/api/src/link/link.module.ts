import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { RangeModule } from '../range/range.module';

@Module({
  imports: [RangeModule],
  providers: [LinkService],
  controllers: [LinkController],
})
export class LinkModule {}
