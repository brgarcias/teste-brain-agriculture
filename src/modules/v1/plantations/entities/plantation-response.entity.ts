/* eslint-disable max-classes-per-file */
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { ProducerResponseEntity } from '@v1/producers/entities/producer-response.entity';

export class PlantationResponseEntity {
  id: number = 0;

  name: string = '';

  producers: ProducerResponseEntity[];

  farms: ProducerResponseEntity[];

  createdAt: Date = new Date();

  updatedAt: Date = new Date();
}

export class AllPlantationsResponseEntity {
  @ValidateNested({ each: true })
  @Type(() => PlantationResponseEntity)
  data?: [] = [];

  collectionName?: string = '';

  options?: {
    location: string;
    paginationParams: PaginationParamsInterface;
    totalCount: number;
  };
}
