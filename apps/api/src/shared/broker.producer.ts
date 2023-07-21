import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class BrokerProducer {
  constructor(
    @Inject('API_KAFKA_CLIENT')
    private readonly producer: ClientKafka
  ) {}

  emit(pattern: string, data: object) {
    return this.producer.emit(pattern, data);
  }
}
