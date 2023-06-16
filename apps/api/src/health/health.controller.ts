import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  async healthCheck() {
    return this.health.check([this.checkDb()]);
  }

  checkDb() {
    return () => this.db.pingCheck('database');
  }
}
