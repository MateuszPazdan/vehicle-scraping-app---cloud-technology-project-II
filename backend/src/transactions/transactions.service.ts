import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    const storage = await this.prisma.storageLocation.findUnique({
      where: {
        id: createTransactionDto.storageLocationId,
      },
    });

    if (!storage) {
      throw new NotFoundException('Nie znaleziono stanowiska o podanym id');
    }

    if (storage.currentMass < createTransactionDto.weight) {
      throw new NotFoundException('Zbyt duża ilość');
    }

    const transaction = await this.prisma.wasteTransaction.create({
      data: {
        totalPrice: createTransactionDto.totalPrice,
        weight: createTransactionDto.weight,
        storageLocationId: storage.id,
        wasteTypeId: storage.wasteTypeId,
      },
      include: {
        storageLocation: {
          select: {
            id: true,
            locationNr: true,
          },
        },
        wasteType: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      omit: {
        storageLocationId: true,
        wasteTypeId: true,
      },
    });

    await this.prisma.storageLocation.update({
      where: {
        id: transaction.storageLocation.id,
      },
      data: {
        currentMass: {
          decrement: transaction.weight,
        },
      },
    });

    return transaction;
  }

  async returnAllTransactions() {
    return await this.prisma.wasteTransaction.findMany({
      include: {
        storageLocation: {
          select: {
            id: true,
            locationNr: true,
          },
        },
        wasteType: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      omit: {
        storageLocationId: true,
        wasteTypeId: true,
      },
      orderBy: {
        transactionDate: 'desc',
      },
    });
  }
}
