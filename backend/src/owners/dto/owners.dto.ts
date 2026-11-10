import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOwnerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  pesel: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id_number: string;
}

export class UpdateOwnerDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  surname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  pesel: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  id_number: string;
}

export class GetOwnersWithFiltersDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  surname?: string;

  @ApiProperty({ required: false })
  pesel?: string;

  @ApiProperty({ required: false })
  address?: string;

  @ApiProperty({ required: false })
  id_number?: string;
}
