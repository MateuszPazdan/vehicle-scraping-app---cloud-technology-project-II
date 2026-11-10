import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AddVehicleToDismantlingDto,
  GetAllVehiclesWithFiltersDto,
  GetFilterInfoDto,
} from './dto/vehicles.dto';
import { VehicleStatus } from '@prisma/client';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  async addVehicleToDismantling(
    addVehicleToDismantlingDto: AddVehicleToDismantlingDto,
  ) {
    const existingVehicleByVin = await this.prisma.vehicle.findUnique({
      where: {
        vin: addVehicleToDismantlingDto.vin,
      },
    });
    if (existingVehicleByVin)
      throw new ConflictException(
        'Pojazd z takim numerem VIN jest już w systemie.',
      );

    const existingVehicleByRegistrationCertificateNumber =
      await this.prisma.vehicle.findUnique({
        where: {
          registration_certificate_number:
            addVehicleToDismantlingDto.registration_certificate_number,
        },
      });

    if (existingVehicleByRegistrationCertificateNumber)
      throw new ConflictException(
        'Pojazd z takim numerem dowodu rejestracyjnego już istnieje.',
      );

    const existingVehicleByRegistrationNumber =
      await this.prisma.vehicle.findUnique({
        where: {
          registration_number: addVehicleToDismantlingDto.registration_number,
        },
      });

    if (existingVehicleByRegistrationNumber)
      throw new ConflictException(
        'Pojazd z takim numerem rejestracyjnym już istnieje.',
      );

    const existingPesels = await this.prisma.owner.findMany({
      where: {
        pesel: {
          in: addVehicleToDismantlingDto.owners,
        },
      },
      select: { pesel: true },
    });
    const existingPeselValues = existingPesels.map((owner) => owner.pesel);

    const missingPesels = addVehicleToDismantlingDto.owners.filter(
      (pesel) => !existingPeselValues.includes(pesel),
    );

    if (missingPesels.length > 0) {
      throw new ConflictException(
        `Kontrahenci o podanych numerach PESEL nie istnieją w systemie: ${missingPesels.join(', ')}.`,
      );
    }
    return await this.prisma.vehicle.create({
      data: {
        brand: addVehicleToDismantlingDto.brand,
        model: addVehicleToDismantlingDto.model,
        registration_certificate_number:
          addVehicleToDismantlingDto.registration_certificate_number,
        registration_number: addVehicleToDismantlingDto.registration_number,
        vin: addVehicleToDismantlingDto.vin,
        weight: addVehicleToDismantlingDto.weight,
        year_of_production: addVehicleToDismantlingDto.year_of_production,
        price: addVehicleToDismantlingDto.price,
        owners: {
          connect: addVehicleToDismantlingDto.owners.map((pesel) => ({
            pesel: pesel,
          })),
        },
      },
    });
  }

  async getAllVehiclesWithFilters(params: GetAllVehiclesWithFiltersDto) {
    const {
      brand,
      model,
      registration_number,
      vin,
      year_of_production,
      vehicle_status,
      owner_pesel,
    } = params;

    return await this.prisma.vehicle.findMany({
      where: {
        ...(brand && { brand: { contains: brand, mode: 'insensitive' } }),
        ...(model && { model: { contains: model, mode: 'insensitive' } }),
        ...(registration_number && {
          registration_number: {
            contains: registration_number,
            mode: 'insensitive',
          },
        }),
        ...(vin && { vin: { contains: vin, mode: 'insensitive' } }),
        ...(year_of_production && {
          year_of_production: Number(year_of_production),
        }),
        ...(vehicle_status && {
          status: vehicle_status,
        }),
        ...(owner_pesel && {
          owners: {
            some: {
              pesel: { contains: owner_pesel, mode: 'insensitive' },
            },
          },
        }),
      },
    });
  }

  async getVehicleById(vehicleId: number) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: {
        id: vehicleId,
      },
      include: {
        owners: true,
      },
    });

    if (!vehicle) {
      throw new NotFoundException('Pojazd o podanym id nie istnieje.');
    }

    return vehicle;
  }

  async getFilterInfo(filterInfo?: GetFilterInfoDto) {
    const brands = await this.prisma.vehicle.findMany({
      select: {
        brand: true,
      },
      distinct: ['brand'],
    });

    if (filterInfo?.brand !== '') {
      const filteredModels = await this.prisma.vehicle.findMany({
        where: {
          brand: { equals: filterInfo?.brand },
        },
        select: {
          model: true,
        },
        distinct: ['model'],
      });

      return {
        brands: brands.map((b) => b.brand),
        models: filteredModels.map((m) => m.model),
      };
    }

    const models = await this.prisma.vehicle.findMany({
      select: {
        model: true,
      },
      distinct: ['model'],
    });

    return {
      brands: brands.map((b) => b.brand),
      models: models.map((m) => m.model),
    };
  }

  async changeVehicleStatus(vehicleId: number, status: VehicleStatus) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: {
        id: vehicleId,
      },
    });

    if (!vehicle) {
      throw new NotFoundException('Pojazd o podanym id nie istnieje.');
    }

    if (vehicle.status === status) {
      throw new ConflictException('Pojazd ma już ten status.');
    }

    return await this.prisma.vehicle.update({
      where: {
        id: vehicleId,
      },
      data: {
        status: status,
        dismantledAt: status === 'DISMANTLED' ? new Date() : null,
      },
    });
  }
}
