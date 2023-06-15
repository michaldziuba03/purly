import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import Zk from 'zookeeper';
import { AliasFactory } from './alias.factory';
import Hashids from 'hashids';

const ZK_EPHEMERAL_SEQUENTIAL = 3; // flag for created znode

interface ICounter {
  seq: number; // sequence number
  start: number; // start of range
  curr: number; // current number
  end: number; // end of range
}

@Injectable()
export class SequentialAliasFactory
  extends AliasFactory
  implements OnModuleInit, OnModuleDestroy
{
  private readonly hashids: Hashids;
  private readonly basePath = '/range';
  private readonly range = 1000;

  private counter: ICounter;
  private zk: Zk;

  constructor() {
    super();
    this.hashids = new Hashids('md03');
  }

  onModuleInit() {
    const zkConfig = {
      connect: process.env['ZOOKEEPER_URI'],
      timeout: 5000,
      debug_level: Zk.ZOO_LOG_LEVEL_WARN,
      host_order_deterministic: false,
    };

    // TODO: change Zookeeper initiation - current method will be harder to test
    this.zk = new Zk(zkConfig);
    this.zk.once('connect', () => {
      Logger.log('Zookeeper connected', SequentialAliasFactory.name);
      this.setRange();
    });

    this.zk.init({});
  }

  onModuleDestroy() {
    this.zk.close();
    Logger.log(
      'Zookeeper disconnected gracefully',
      SequentialAliasFactory.name
    );
  }

  private async setRange() {
    // returns something like "/range0000000001":
    const path = await this.zk.create(
      this.basePath,
      '',
      ZK_EPHEMERAL_SEQUENTIAL
    );

    const seq = this.parseSeq(path);
    const end = seq * this.range;
    const start = end - (this.range - 1);

    this.counter = {
      seq,
      start,
      curr: start,
      end,
    };
  }

  private parseSeq(path: string) {
    return Number(path.replace(this.basePath, '')) + 1;
  }

  async create(): Promise<string> {
    if (!this.counter) {
      throw new Error('Range is not initialized yet');
    }

    if (this.counter.curr >= this.counter.end) {
      await this.setRange();
    }

    const nextNum = this.counter.curr;
    this.counter.curr++;

    return this.hashids.encode(nextNum);
  }
}
