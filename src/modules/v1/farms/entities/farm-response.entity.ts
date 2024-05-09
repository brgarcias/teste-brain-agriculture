/* eslint-disable max-classes-per-file */
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { ProducerResponseEntity } from '@v1/producers/entities/producer-response.entity';

export class FarmResponseEntity {
  id: number = 0;

  name: string = '';

  city: string = '';

  state: string = '';

  agriculturalArea: number = 0;

  vegetationArea: number = 0;

  totalArea: number = 0;

  producer: ProducerResponseEntity;

  createdAt: Date = new Date();

  updatedAt: Date = new Date();
}

export class AllFarmsResponseEntity {
  @ValidateNested({ each: true })
  @Type(() => FarmResponseEntity)
  data?: [] = [];

  collectionName?: string = '';

  options?: {
    location: string;
    paginationParams: PaginationParamsInterface;
    totalCount: number;
  };
}
