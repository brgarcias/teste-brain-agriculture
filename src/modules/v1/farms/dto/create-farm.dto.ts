import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Validate,
} from 'class-validator';
import { IsValidState } from '../validators/state.validator';
import { Transform } from 'class-transformer';
import { IsValidTotalArea } from '../validators/total-area.validator';

export default class CreateFarmDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty({ message: 'Name can not be empty' })
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
  @Transform(({ value }) => value.toUpperCase())
  @Validate(IsValidState, { always: true })
  readonly state: string = '';

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  readonly agriculturalArea: number = 0;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  readonly vegetationArea: number = 0;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  @Validate(IsValidTotalArea, { always: true })
  readonly totalArea: number = 0;
}
