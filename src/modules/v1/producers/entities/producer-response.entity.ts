/* eslint-disable max-classes-per-file */
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { DocumentsEnum } from '../enum/document-type.enum';
import { FarmResponseEntity } from '@v1/farms/entities/farm-response.entity';

export class ProducerResponseEntity {
  id: number = 0;

  name: string = '';

  document: string = '';

  documentType: DocumentsEnum = DocumentsEnum.CPF;

  farms: FarmResponseEntity[];

  createdAt: Date = new Date();

  updatedAt: Date = new Date();
}

export class AllProducersResponseEntity {
  @ValidateNested({ each: true })
  @Type(() => ProducerResponseEntity)
  data?: [] = [];

  collectionName?: string = '';

  options?: {
    location: string;
    paginationParams: PaginationParamsInterface;
    totalCount: number;
  };
}
