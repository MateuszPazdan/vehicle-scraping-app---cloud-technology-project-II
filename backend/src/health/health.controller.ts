import { Controller, Get, Logger } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HealthIndicatorService,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(
    private readonly healthService: HealthCheckService,
    private readonly healthIndicator: HealthIndicatorService,
    private readonly prismaHealth: PrismaHealthIndicator,
    private readonly prisma: PrismaService,
  ) {}

  @Get('live')
  @HealthCheck()
  live() {
    return this.healthService.check([]);
  }

  @Get('ready')
  @HealthCheck()
  ready() {
    return this.healthService.check([
      () => this.checkDatabase(),
      () => this.checkSimulatedFailure(),
    ]);
  }

  private checkSimulatedFailure() {
    const indicator = this.healthIndicator.check('app');

    if (process.env.SIMULATE_UNHEALTHY === 'true') {
      this.logger.warn('SIMULATE_UNHEALTHY is set, reporting not ready');
      return indicator.down();
    }

    return indicator.up();
  }


  private async checkDatabase() {
    const indicator = this.healthIndicator.check('database');
    const result = await this.prismaHealth.pingCheck('database', this.prisma);

    if (result.database.status === 'up') {
      return indicator.up();
    }

    this.logger.error(
      `Database health check failed: ${result.database.message ?? 'unknown error'}`,
    );
    return indicator.down();
  }
}
