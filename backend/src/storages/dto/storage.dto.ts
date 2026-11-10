import { ApiProperty } from '@nestjs/swagger';

export class CreateStorageDto {
  @ApiProperty()
  locationNr: string;
  @ApiProperty()
  wasteTypeId: number;
}

export class UpdateStorageDto {
  @ApiProperty()
  locationNr?: string;
}
