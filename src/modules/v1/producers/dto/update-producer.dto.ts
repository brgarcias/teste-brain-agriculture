import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { DocumentsEnum } from '../enum/document-type.enum';

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
  readonly document?: string = '';

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  @MaxLength(64)
  readonly documentType?: DocumentsEnum = DocumentsEnum.CPF;
}
