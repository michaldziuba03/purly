import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Config } from '../config/config';
import Zk from 'zookeeper';
const ZK_EPHEMERAL_SEQUENTIAL = 3; // flag for created znode

interface ICounter {
  seq: number; // sequence number
  start: number; // start of range
  curr: number; // current number
  end: number; // end of range
}

@Injectable()
export class RangeService implements OnModuleInit, OnModuleDestroy {
  private readonly basePath = '/range';
  private readonly range = 1000;

  private counter: ICounter;
  private zk: Zk;

  constructor(private readonly config: Config) {}

  onModuleInit() {
    const zkConfig = {
      connect: this.config.zookeeperURI,
      timeout: 5000,
      debug_level: Zk.ZOO_LOG_LEVEL_WARN,
      host_order_deterministic: false,
    };

    // TODO: change Zookeeper initiation - current method will be hard to test
    this.zk = new Zk(zkConfig);
    this.zk.once('connect', () => {
      Logger.log('Zookeeper connected', RangeService.name);
      this.setRange();
    });

    this.zk.init({});
  }

  onModuleDestroy() {
    this.zk.close();
    Logger.log('Zookeeper disconnected gracefully', RangeService.name);
  }

  private async setRange() {
    const path = await this.zk.create(
      this.basePath,
      '',
      ZK_EPHEMERAL_SEQUENTIAL,
    ); // returns something like "/range0000000001"

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

  async next() {
    if (!this.counter) {
      throw new Error('Range is not initialized yet');
    }

    if (this.counter.curr >= this.counter.end) {
      await this.setRange();
    }

    const nextNum = this.counter.curr;
    this.counter.curr++;

    return nextNum;
  }
}
