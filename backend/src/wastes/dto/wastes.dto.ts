import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWasteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  pricePerKg: number;
}

export class AssignWasteEntryDto {
  @ApiProperty()
  vehicleId: number;
  @ApiProperty()
  wasteTypeId: number;
  @ApiProperty()
  weight: number;
}
