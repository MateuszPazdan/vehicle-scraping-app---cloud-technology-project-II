import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateOwnerDto,
  GetOwnersWithFiltersDto,
  UpdateOwnerDto,
} from './dto/owners.dto';
import { OwnerResponseDto } from './dto/owners.response.dto';

@Injectable()
export class OwnersService {
  constructor(private prisma: PrismaService) {}

  async createOwner(createOwnerDto: CreateOwnerDto): Promise<OwnerResponseDto> {
    if (!/^\d{11}$/.test(createOwnerDto.pesel)) {
      throw new BadRequestException(
        'Niepoprawny format peselu. Musi składać się z 11 znaków',
      );
    }
    const existingPesel = await this.prisma.owner.findUnique({
      where: { pesel: createOwnerDto.pesel },
    });
    if (existingPesel) {
      throw new ConflictException('Kontrahent z takim peselem już istnieje.');
    }
    const existingIdNumber = await this.prisma.owner.findUnique({
      where: { id_number: createOwnerDto.id_number },
    });

    if (existingIdNumber) {
      throw new ConflictException(
        'Kontrahent z takim numerem dowodu już istnieje.',
      );
    }
    return await this.prisma.owner.create({
      data: {
        name: createOwnerDto.name,
        surname: createOwnerDto.surname,
        address: createOwnerDto.address,
        pesel: createOwnerDto.pesel,
        id_number: createOwnerDto.id_number,
      },
    });
  }

  async updateOwner(updateOwnerDto: UpdateOwnerDto) {
    const existingPesel = await this.prisma.owner.findUnique({
      where: { pesel: updateOwnerDto.pesel },
    });
    if (!existingPesel) {
      throw new ConflictException('Kontrahent z takim peselem nie istnieje.');
    }

    await this.prisma.owner.update({
      where: {
        pesel: updateOwnerDto.pesel,
      },
      data: {
        name: updateOwnerDto.name,
        surname: updateOwnerDto.surname,
        address: updateOwnerDto.address,
        id_number: updateOwnerDto.id_number,
      },
    });
    return {
      where: { pesel: updateOwnerDto.pesel },
      create: {},
    };
  }

  async getOwners(
    params: GetOwnersWithFiltersDto,
  ): Promise<OwnerResponseDto[]> {
    return await this.prisma.owner.findMany({
      where: {
        AND: [
          params.name
            ? { name: { contains: params.name, mode: 'insensitive' } }
            : {},
          params.surname
            ? { surname: { contains: params.surname, mode: 'insensitive' } }
            : {},
          params.pesel
            ? { pesel: { contains: params.pesel, mode: 'insensitive' } }
            : {},
          params.address
            ? { address: { contains: params.address, mode: 'insensitive' } }
            : {},
          params.id_number
            ? { id_number: { contains: params.id_number, mode: 'insensitive' } }
            : {},
        ],
      },
    });
  }

  async getOwner(id: number): Promise<OwnerResponseDto> {
    const user = await this.prisma.owner.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException('Nie znaleziono użytkownika.');

    return user;
  }
}
