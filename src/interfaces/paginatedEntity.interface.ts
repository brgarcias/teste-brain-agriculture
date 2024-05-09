// ENTITIES
import ProducerEntity from '@v1/producers/schemas/producer.entity';
import FarmEntity from '@v1/farms/schemas/farm.entity';
import PlantationEntity from '@v1/plantations/schemas/plantation.entity';
import ProductionEntity from '@v1/productions/schemas/production.entity';

export interface PaginatedProducersInterface {
  readonly paginatedResult: ProducerEntity[] | [];
  readonly totalCount: number;
}

export interface PaginatedFarmsInterface {
  readonly paginatedResult: FarmEntity[] | [];
  readonly totalCount: number;
}

export interface PaginatedPlantationsInterface {
  readonly paginatedResult: PlantationEntity[] | [];
  readonly totalCount: number;
}

export interface PaginatedProductionsInterface {
  readonly paginatedResult: ProductionEntity[] | [];
  readonly totalCount: number;
}
