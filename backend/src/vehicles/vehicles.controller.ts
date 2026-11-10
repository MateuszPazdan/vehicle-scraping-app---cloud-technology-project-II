import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import {
  AddVehicleToDismantlingDto,
  GetAllVehiclesWithFiltersDto,
  GetFilterInfoDto,
} from './dto/vehicles.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiResponse } from '@nestjs/swagger';
import {
  AvailableFiltersResponseDto,
  VehicleResponseDto,
  VehicleWithOwnerResponseDto,
} from './dto/vehicle.response.dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'Return a new vehicle',
    type: VehicleResponseDto,
  })
  async addVehicleToDismantling(
    @Body() addVehicleToDismantlingDto: AddVehicleToDismantlingDto,
  ) {
    return this.vehiclesService.addVehicleToDismantling(
      addVehicleToDismantlingDto,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Return a list of vehicles with filters',
    isArray: true,
    type: VehicleResponseDto,
  })
  async getAllVehiclesWithFilters(
    @Query()
    params: GetAllVehiclesWithFiltersDto,
  ) {
    return await this.vehiclesService.getAllVehiclesWithFilters(params);
  }

  @Get('details/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Return a single vehicle by id with owners',
    type: VehicleWithOwnerResponseDto,
  })
  async getVehicleById(@Param('id') id: string) {
    return await this.vehiclesService.getVehicleById(+id);
  }

  @Get('filter_input')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Return available models and brands',
    type: AvailableFiltersResponseDto,
  })
  async getFilterInput(@Query() filterInfo?: GetFilterInfoDto) {
    return await this.vehiclesService.getFilterInfo(filterInfo);
  }

  @Patch('status/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Change the status of a vehicle to dismantled',
    type: VehicleResponseDto,
  })
  async changeVehicleStatusToDismantled(@Param('id') id: string) {
    return await this.vehiclesService.changeVehicleStatus(+id, 'DISMANTLED');
  }
}
