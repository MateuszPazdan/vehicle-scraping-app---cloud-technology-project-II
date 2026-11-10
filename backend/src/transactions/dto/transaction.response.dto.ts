import { ApiProperty } from '@nestjs/swagger';

export class TransactionResponseDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  weight: number;
  @ApiProperty()
  transactionDate: string;
  @ApiProperty()
  totalPrice: number;
  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
      locationNr: { type: 'string' },
    },
  })
  storageLocation: {
    id: number;
    locationNr: string;
  };
  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
    },
  })
  wasteType: {
    id: number;
    name: string;
  };
}
