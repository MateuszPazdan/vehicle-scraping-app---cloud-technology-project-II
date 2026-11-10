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

  @Get()
  @HealthCheck()
  check() {
    return this.healthService.check([() => this.checkDatabase()]);
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
