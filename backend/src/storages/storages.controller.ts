import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { StoragesService } from './storages.service';
import { ApiResponse } from '@nestjs/swagger';
import { StorageResponseDto } from './dto/storage.respnse.dto';
import { CreateStorageDto, UpdateStorageDto } from './dto/storage.dto';
import { Response } from 'express';

@Controller('storages')
export class StoragesController {
  constructor(private readonly storageService: StoragesService) {}

  @Post()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'Create and return a new storage',
    type: StorageResponseDto,
  })
  async createStorage(@Body() createStorageDto: CreateStorageDto) {
    return await this.storageService.createStorage(createStorageDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Return a list of all storages',
    type: StorageResponseDto,
    isArray: true,
  })
  async getAllStorages() {
    return await this.storageService.getAllStorages();
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Update and return a storage by id',
    type: StorageResponseDto,
  })
  async updateStorage(
    @Param('id') id: string,
    @Body() updateStorageDto: UpdateStorageDto,
  ) {
    return await this.storageService.updateStorage(+id, updateStorageDto);
  }

  @Get('status')
  async getStorageStatusPdf(@Res() res: Response) {
    const pdfBuffer = await this.storageService.generateReportStorageStatus();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="storage-status.pdf"',
      'Content-Length': pdfBuffer.length,
    });

    res.end(pdfBuffer);
  }
}
