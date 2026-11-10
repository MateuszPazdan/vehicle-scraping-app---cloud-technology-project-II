import { ApiProperty } from '@nestjs/swagger';

export class StorageResponseDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  locationNr: string;
  @ApiProperty()
  currentMass: number;
  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
    },
  })
  wasteTyppe: {
    id: number;
    name: string;
  };
}
