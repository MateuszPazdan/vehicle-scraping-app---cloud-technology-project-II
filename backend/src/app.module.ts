import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { OwnersController } from './owners/owners.controller';
import { OwnersModule } from './owners/owners.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { WastesController } from './wastes/wastes.controller';
import { WastesService } from './wastes/wastes.service';
import { WastesModule } from './wastes/wastes.module';
import { StoragesController } from './storages/storages.controller';
import { StoragesService } from './storages/storages.service';
import { StoragesModule } from './storages/storages.module';
import { TransactionsController } from './transactions/transactions.controller';
import { TransactionsService } from './transactions/transactions.service';
import { TransactionsModule } from './transactions/transactions.module';
import { MetricsModule } from './monitoring/metrics.module';
import { MetricsController } from './monitoring/metrics.controller';
import { MetricsMiddleware } from './monitoring/metrics.middleware';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UsersModule,
    OwnersModule,
    VehiclesModule,
    WastesModule,
    StoragesModule,
    TransactionsModule,
    MetricsModule,
  ],
  controllers: [
    OwnersController,
    WastesController,
    StoragesController,
    TransactionsController,
    MetricsController,
  ],
  providers: [WastesService, StoragesService, TransactionsService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MetricsMiddleware).forRoutes('*');
  }
}
