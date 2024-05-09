import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export default class CreateFarmDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  readonly name: string = '';

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  readonly city: string = '';

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MaxLength(2)
  readonly state: string = '';

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  readonly agriculturalArea: number = 0;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  readonly vegetationArea: number = 0;
}
