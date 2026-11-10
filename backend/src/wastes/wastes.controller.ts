import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WastesService } from './wastes.service';
import { AssignWasteEntryDto, CreateWasteDto } from './dto/wastes.dto';
import { ApiResponse } from '@nestjs/swagger';
import { WasteResponseDto } from './dto/wastes.response.dto';

@Controller('wastes')
export class WastesController {
  constructor(private readonly wasteService: WastesService) {}

  @Post('/type')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'Create and return a new waste type',
    type: WasteResponseDto,
  })
  async createWaste(@Body() createWasteDto: CreateWasteDto) {
    return await this.wasteService.createWaste(createWasteDto);
  }

  @Get('/type')
  @ApiResponse({
    status: 200,
    description: 'Return a list of all waste types',
    type: WasteResponseDto,
    isArray: true,
  })
  async getAllWastes() {
    return await this.wasteService.getAllWastes();
  }

  @Delete('/type/:id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Delete a waste type by id',
    type: WasteResponseDto,
  })
  async deleteWaste(@Param('id') id: string) {
    return await this.wasteService.deleteWaste(+id);
  }

  @Patch('/type/:id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Update and return a waste type by id',
    type: WasteResponseDto,
  })
  async updateWaste(
    @Param('id') id: string,
    @Body() updateWasteDto: CreateWasteDto,
  ) {
    return await this.wasteService.updateWaste(+id, updateWasteDto);
  }

  @Post('/entry')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'Assign a waste entry to a waste type and return the result',
  })
  async assignWasteEntry(@Body() assignWasteEntryDto: AssignWasteEntryDto) {
    return await this.wasteService.assignWasteEntry(assignWasteEntryDto);
  }

  @Get('/entry/:id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Return a list of waste entries, filtered by car ID',
  })
  async getWasteEntriesByCarId(@Param('id') id: string) {
    return await this.wasteService.getWasteEntriesByVehicleId(+id);
  }
}
