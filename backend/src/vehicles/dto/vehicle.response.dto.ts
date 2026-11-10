import { ApiProperty } from '@nestjs/swagger';
import { OwnerResponseDto } from 'src/owners/dto/owners.response.dto';

export class VehicleResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  year_of_production: number;

  @ApiProperty()
  vin: string;

  @ApiProperty()
  registration_number: string;

  @ApiProperty()
  registration_certificate_number: string;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  receivedAt: string;

  @ApiProperty()
  dismantledAt: string;

  @ApiProperty()
  price: number;
}

export class VehicleWithOwnerResponseDto extends VehicleResponseDto {
  @ApiProperty({ type: OwnerResponseDto, isArray: true })
  owners: OwnerResponseDto[];
}

export class AvailableFiltersResponseDto {
  @ApiProperty()
  brands: string[];

  @ApiProperty()
  models: string[];
}
