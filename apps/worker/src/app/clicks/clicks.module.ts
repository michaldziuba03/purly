import { Module } from '@nestjs/common';
import { ClicksProcessor } from './clicks.processor';

@Module({
  providers: [ClicksProcessor],
})
export class ClicksModule {}
