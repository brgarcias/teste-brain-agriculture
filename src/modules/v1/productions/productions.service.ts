// NEST.JS
import { Inject, Injectable } from '@nestjs/common';
// INTERFACES
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { PaginatedProductionsInterface } from '@interfaces/paginatedEntity.interface';
// SCHEMAS
import ProductionEntity from './schemas/production.entity';
import { IProductionRepository } from './interfaces/productions.interface';
import { FindAllProductionsUseCase } from './use-cases/find-all-productions.use-case';
import CreateProductionDto from './dto/create-production.dto';

@Injectable()
export default class ProductionService {
  constructor(
    @Inject('IProductionRepository')
    private repository: IProductionRepository,
    private findAllProductionsUseCase: FindAllProductionsUseCase,
  ) {}

  public async createOne(
    production: CreateProductionDto,
  ): Promise<ProductionEntity> {
    return this.repository.createOne(production);
  }

  public async findOne(id: number): Promise<ProductionEntity | null> {
    return this.repository.findOne(id);
  }

  public async findAll(
    options: PaginationParamsInterface,
  ): Promise<PaginatedProductionsInterface> {
    return this.findAllProductionsUseCase.execute(options);
  }
}
