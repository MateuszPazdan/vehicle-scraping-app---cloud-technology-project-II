import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { OwnersService } from 'src/owners/owners.service';

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService, OwnersService],
  exports: [VehiclesService],
})
export class VehiclesModule {}
