import { ApiProperty } from '@nestjs/swagger';

export class OwnerResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Jan' })
  name: string;

  @ApiProperty({ example: 'Kowalski' })
  surname: string;

  @ApiProperty({ example: '12345678901' })
  pesel: string;

  @ApiProperty({ example: '39-100,Warszawa, ul. Długa 10' })
  address: string;

  @ApiProperty({ example: 'ABC123456' })
  id_number: string;
}
