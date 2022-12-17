import { Logger, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { RangeService } from './range.service';
import Zk from 'zookeeper';
import { Config } from 'src/config/config';

@Module({
  providers: [RangeService],
  exports: [RangeService]
})
export class RangeModule implements OnModuleInit, OnModuleDestroy {
  private zk: Zk;

  constructor(
    private readonly rangeService: RangeService,
    private readonly config: Config,
  ) {}
  
  onModuleInit() {
    const zkConfig = {
      connect: this.config.zkConnect,
      timeout: 5000,
      debug_level: Zk.ZOO_LOG_LEVEL_WARN,
      host_order_deterministic: false,
  };

    this.zk = new Zk(zkConfig);

    this.zk.once('connect', () => {
      Logger.log('Zookeeper connected', RangeModule.name);
      this.rangeService.initRange(this.zk);
    });

    this.zk.init({});
  }

  onModuleDestroy() {
    this.zk.close();
    Logger.log('Zookeeper disconnected gracefully', RangeModule.name);
  }
}
