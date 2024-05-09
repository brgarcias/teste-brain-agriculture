import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import PlantationEntity from '../schemas/plantation.entity';

export interface IPlantationRepository {
  findOne(id: number): Promise<PlantationEntity | null>;
  findAll(options: PaginationParamsInterface): Promise<PlantationEntity[]>;
  countAll(): Promise<number>;
}
