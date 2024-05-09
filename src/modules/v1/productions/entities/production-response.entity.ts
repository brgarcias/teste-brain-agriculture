/* eslint-disable max-classes-per-file */
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { ProducerResponseEntity } from '@v1/producers/entities/producer-response.entity';
import { PlantationResponseEntity } from '@v1/plantations/entities/plantation-response.entity';

export class ProductionResponseEntity {
  id: number = 0;

  plantations: PlantationResponseEntity;

  producers: ProducerResponseEntity;

  farms: ProducerResponseEntity;

  createdAt: Date = new Date();

  updatedAt: Date = new Date();
}

export class AllProductionsResponseEntity {
  @ValidateNested({ each: true })
  @Type(() => ProductionResponseEntity)
  data?: [] = [];

  collectionName?: string = '';

  options?: {
    location: string;
    paginationParams: PaginationParamsInterface;
    totalCount: number;
  };
}
