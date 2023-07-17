import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { DatabaseHealthIndicator } from '@purly/database';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: DatabaseHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  async healthCheck() {
    return this.health.check([this.checkDb()]);
  }

  private checkDb() {
    return () => this.db.healthCheck();
  }
}
