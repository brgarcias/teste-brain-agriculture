import FarmEntity from '../schemas/farm.entity';

export interface IFarmRepository {
  findAll(): Promise<FarmEntity[]>;
  countAll(): Promise<number>;
}
