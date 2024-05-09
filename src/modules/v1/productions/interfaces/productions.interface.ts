import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import ProductionEntity from '../schemas/production.entity';

export interface IProductionRepository {
  findOne(id: number): Promise<ProductionEntity | null>;
  findAll(options: PaginationParamsInterface): Promise<ProductionEntity[]>;
  countAll(): Promise<number>;
}
