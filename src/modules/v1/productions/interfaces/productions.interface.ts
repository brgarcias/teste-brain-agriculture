import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import ProductionEntity from '../schemas/production.entity';
import CreateProductionDto from '../dto/create-production.dto';

export interface IProductionRepository {
  createOne(
    createProductionDto: CreateProductionDto,
  ): Promise<ProductionEntity>;
  findOne(id: number): Promise<ProductionEntity | null>;
  findAll(options: PaginationParamsInterface): Promise<ProductionEntity[]>;
  countAll(): Promise<number>;
}
