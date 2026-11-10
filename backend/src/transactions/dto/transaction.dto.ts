import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty()
  weight: number;
  @ApiProperty()
  storageLocationId: number;
  @ApiProperty()
  totalPrice: number;
  
}
