// NEST.JS
import { Inject, Injectable } from '@nestjs/common';
import { FindAllInAcreFarmsUseCase } from './use-cases/find-all-in-acre-farms.use-case';
import { IFarmRepository } from './interfaces/farms.interface';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { PaginatedFarmsInterface } from '@interfaces/paginatedEntity.interface';
import FarmEntity from './schemas/farm.entity';
import { FindAllFarmsUseCase } from './use-cases/find-all-farms.use-case copy';

@Injectable()
export default class FarmService {
  constructor(
    @Inject('IFarmRepository')
    private repository: IFarmRepository,
    private findAcresFarmsUseCase: FindAllInAcreFarmsUseCase,
    private findAllFarmsUseCase: FindAllFarmsUseCase,
  ) {}

  public async findQuantity(): Promise<number> {
    return this.repository.countAll();
  }

  public async findAllInAcre(
    options: PaginationParamsInterface,
  ): Promise<number> {
    return this.findAcresFarmsUseCase.execute(options);
  }

  public async findOne(id: number): Promise<FarmEntity> {
    return this.repository.findOne(id);
  }

  public async findAll(
    options: PaginationParamsInterface,
  ): Promise<PaginatedFarmsInterface> {
    return this.findAllFarmsUseCase.execute(options);
  }
}
