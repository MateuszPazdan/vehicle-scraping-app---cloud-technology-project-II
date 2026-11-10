import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { httpRequestCounter, httpRequestDuration } from './http.metrics';

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = process.hrtime();

    res.on('finish', () => {
      const diff = process.hrtime(start);
      const duration = diff[0] + diff[1] / 1e9;

      const route = req.route?.path || req.url;

      httpRequestCounter
        .labels(req.method, route, res.statusCode.toString())
        .inc();

      httpRequestDuration
        .labels(req.method, route, res.statusCode.toString())
        .observe(duration);
    });

    next();
  }
}