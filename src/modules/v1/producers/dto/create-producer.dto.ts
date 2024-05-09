import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsArray,
  Validate,
  ValidateNested,
} from 'class-validator';
import { DocumentsEnum } from '../enum/document-type.enum';
import CreateFarmDto from '@v1/farms/dto/create-farm.dto';
import { Transform, Type } from 'class-transformer';
import { IsCNPJorCPF } from '../validators/validations';

export default class CreateProducerDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty({ message: 'Name can not be empty' })
  @MaxLength(64)
  readonly name: string = '';

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty({ message: 'Document can not be empty' })
  @MaxLength(64)
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @Validate(IsCNPJorCPF, { always: true })
  readonly document: string = '';

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Document Type can not be empty' })
  @IsString()
  @MaxLength(64)
  readonly documentType: DocumentsEnum = DocumentsEnum.CPF;

  @ApiProperty({ type: [CreateFarmDto] })
  @IsNotEmpty({
    message: 'Document Type can not be empty',
    always: true,
    each: true,
  })
  @IsArray()
  @ValidateNested({ each: true, always: true })
  @Type(() => CreateFarmDto)
  readonly farms: CreateFarmDto[] = [];
}
