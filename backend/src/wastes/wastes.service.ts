import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AssignWasteEntryDto, CreateWasteDto } from './dto/wastes.dto';

@Injectable()
export class WastesService {
  constructor(private prisma: PrismaService) {}

  async createWaste(createWasteDto: CreateWasteDto) {
    return await this.prisma.wasteType.create({
      data: {
        name: createWasteDto.name,
        pricePerKg: createWasteDto.pricePerKg,
      },
    });
  }

  async getAllWastes() {
    return await this.prisma.wasteType.findMany();
  }

  async deleteWaste(id: number) {
    const waste = await this.prisma.wasteType.findUnique({
      where: {
        id,
      },
    });

    if (!waste) {
      throw new NotFoundException('Nie znaleziono odpadu o podanym id');
    }

    return await this.prisma.wasteType.delete({
      where: {
        id,
      },
    });
  }

  async updateWaste(id: number, updateWasteDto: CreateWasteDto) {
    const waste = await this.prisma.wasteType.findUnique({
      where: {
        id,
      },
    });

    if (!waste) {
      throw new NotFoundException('Nie znaleziono odpadu o podanym id');
    }

    return await this.prisma.wasteType.update({
      where: {
        id,
      },
      data: {
        name: updateWasteDto.name,
        pricePerKg: updateWasteDto.pricePerKg,
      },
    });
  }

  async assignWasteEntry(assignWasteEntryDto: AssignWasteEntryDto) {
    const storageLocation = await this.prisma.storageLocation.findFirst({
      where: {
        wasteTypeId: assignWasteEntryDto.wasteTypeId,
      },
      orderBy: {
        currentMass: 'asc',
      },
    });

    if (!storageLocation) {
      throw new NotFoundException(
        'Brak przypisanego magazynu na ten rodzaj odpadu',
      );
    }

    const wasteEntry = await this.prisma.wasteEntry.create({
      data: {
        vehicleId: assignWasteEntryDto.vehicleId,
        weight: assignWasteEntryDto.weight,
        wasteTypeId: assignWasteEntryDto.wasteTypeId,
        storageLocationId: storageLocation.id,
      },
    });

    await this.prisma.storageLocation.update({
      where: { id: storageLocation.id },
      data: {
        currentMass: {
          increment: assignWasteEntryDto.weight,
        },
      },
    });

    return wasteEntry;
  }

  async getWasteEntriesByVehicleId(id: number) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: {
        id: id,
      },
    });

    if (!vehicle) {
      throw new NotFoundException('Nie znaleziono pojazdu o takim id');
    }

    return await this.prisma.wasteEntry.findMany({
      where: {
        vehicleId: id,
      },
      include: {
        wasteType: {
          select: {
            id: true,
            name: true,
          },
        },
        storageLocation: {
          select: {
            id: true,
            locationNr: true,
          },
        },
      },
      omit: {
        storageLocationId: true,
        wasteTypeId: true,
      },
    });
  }
}
