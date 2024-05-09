import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import FarmEntity from '../schemas/farm.entity';

export interface IFarmRepository {
  findOne(id: number): Promise<FarmEntity>;
  findAll(options: PaginationParamsInterface): Promise<FarmEntity[]>;
  countAll(): Promise<number>;
}
