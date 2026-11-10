import { ApiProperty } from '@nestjs/swagger';
import { VehicleStatus } from '@prisma/client';
import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
} from 'class-validator';

export class AddVehicleToDismantlingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  brand: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  model: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  year_of_production: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  vin: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  registration_number: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  registration_certificate_number: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  weight: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;
  @ApiProperty({ type: String, isArray: true })
  @ArrayNotEmpty()
  @Matches(/^\d{11}$/, {
    each: true,
    message: 'Each owner must be a valid 11-digit PESEL number',
  })
  @IsNotEmpty()
  owners: string[];
}

export class GetAllVehiclesWithFiltersDto {
  @ApiProperty({ required: false })
  brand?: string;

  @ApiProperty({ required: false })
  model?: string;

  @ApiProperty({ required: false })
  year_of_production?: string;

  @ApiProperty({ required: false })
  registration_number?: string;

  @ApiProperty({ required: false })
  vin?: string;

  @ApiProperty({
    required: false,
    enum: VehicleStatus,
  })
  vehicle_status?: VehicleStatus;

  @ApiProperty({ required: false })
  owner_pesel?: string;
}

export class GetFilterInfoDto {
  @ApiProperty({ required: false })
  brand?: string;
}
