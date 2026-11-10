import { ApiProperty } from "@nestjs/swagger";

export class WasteResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  pricePerKg: number;
}
