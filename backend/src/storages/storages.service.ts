import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStorageDto, UpdateStorageDto } from './dto/storage.dto';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as fs from 'fs';

@Injectable()
export class StoragesService {
  constructor(private prisma: PrismaService) {}

  async createStorage(createStorageDto: CreateStorageDto) {
    const existingStorage = await this.prisma.storageLocation.findUnique({
      where: {
        locationNr: createStorageDto.locationNr,
      },
    });
    if (existingStorage) {
      throw new ConflictException('Istnieje już lokalizacja o podanym numerze');
    }

    const wasteType = await this.prisma.wasteType.findUnique({
      where: {
        id: createStorageDto.wasteTypeId,
      },
    });
    if (!wasteType) {
      throw new ConflictException('Nie znaleziono odpadu o podanym id');
    }

    return await this.prisma.storageLocation.create({
      data: {
        locationNr: createStorageDto.locationNr,
        wasteTypeId: createStorageDto.wasteTypeId,
        currentMass: 0,
      },
      include: {
        wasteType: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      omit: {
        wasteTypeId: true,
      },
    });
  }

  async getAllStorages() {
    return await this.prisma.storageLocation.findMany({
      include: {
        wasteType: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      omit: {
        wasteTypeId: true,
      },
      orderBy: {
        locationNr: 'asc',
      },
    });
  }

  async updateStorage(id: number, updateStorageDto: UpdateStorageDto) {
    const existingStorage = await this.prisma.storageLocation.findUnique({
      where: {
        locationNr: updateStorageDto.locationNr,
      },
    });
    if (existingStorage) {
      throw new ConflictException('Istnieje już lokalizacja o podanym numerze');
    }

    const storage = await this.prisma.storageLocation.findUnique({
      where: {
        id,
      },
    });

    if (!storage) {
      throw new ConflictException('Nie znaleziono lokalizacji o podanym id');
    }

    return await this.prisma.storageLocation.update({
      where: {
        id,
      },
      data: {
        locationNr: updateStorageDto.locationNr,
      },
      include: {
        wasteType: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      omit: {
        wasteTypeId: true,
      },
    });
  }

  async generateReportStorageStatus() {
    const storages = await this.prisma.storageLocation.findMany({
      include: {
        wasteType: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      omit: {
        wasteTypeId: true,
      },
      orderBy: {
        locationNr: 'asc',
      },
    });

    const dataForReport = storages?.map((storage) => {
      return [
        String(storage.locationNr),
        String(storage.wasteType?.name || ''),
        String(storage.currentMass),
      ];
    });

    const now = new Date();
    const formattedDate = now.toLocaleDateString('pl-PL');
    const formattedTime = now.toLocaleTimeString('pl-PL', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const doc = new jsPDF();
    const fontBase64 = fs.readFileSync(
      './src/assets/Lato-Regular.ttf',
      'base64',
    );

    doc.addFileToVFS('Lato-Regular', fontBase64);
    doc.addFont('Lato-Regular', 'Lato', 'normal');
    doc.setFont('Lato', 'normal');

    doc.setFontSize(18);
    doc.text('Stan magazynowy', 14, 20);

    doc.setFontSize(11);
    doc.text(`Data wystawienia: ${formattedDate}, ${formattedTime}`, 14, 28);

    autoTable(doc, {
      startY: 34,
      head: [['Nr Lokalizacji', 'Rodzaj Odpadu', 'Masa [kg]']],
      body: dataForReport,
      styles: {
        font: 'Lato',
        fontSize: 10,
      },
      headStyles: {
        fillColor: [82, 183, 136],
        textColor: [255, 255, 255],
      },
    });

    const pdfBuffer = doc.output('arraybuffer');
    return Buffer.from(pdfBuffer);
  }
}
