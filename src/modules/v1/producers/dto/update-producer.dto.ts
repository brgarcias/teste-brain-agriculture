import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, Validate } from 'class-validator';
import { DocumentsEnum } from '../enum/document-type.enum';
import { Transform } from 'class-transformer';
import { IsCNPJorCPF } from '../validators/validations';

export default class UpdateProducerDto {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  @MaxLength(64)
  readonly name?: string = '';

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  @MaxLength(64)
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @Validate(IsCNPJorCPF, { always: true })
  readonly document?: string = '';

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  @MaxLength(64)
  readonly documentType?: DocumentsEnum = DocumentsEnum.CPF;
}
