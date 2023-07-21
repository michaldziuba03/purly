import { Global, Module } from '@nestjs/common';
import { BrokerProducer } from './broker.producer';

@Global()
@Module({
  providers: [BrokerProducer],
  exports: [BrokerProducer],
})
export class SharedModule {}
