import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export default class CreateProductionDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  readonly producer: number = 0;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  readonly farm: number = 0;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  readonly plantation: number = 0;
}
