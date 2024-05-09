import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
  IsArray,
} from 'class-validator';
import { DocumentsEnum } from '../enum/document-type.enum';
import CreateFarmDto from '@v1/farms/dto/create-farm.dto';

export default class CreateProducerDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  readonly name: string = '';

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  readonly document: string = '';

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  readonly documentType: DocumentsEnum = DocumentsEnum.CPF;

  @ApiProperty({ type: [CreateFarmDto] })
  @IsOptional()
  @IsArray()
  readonly farms?: CreateFarmDto[] = [];
}
