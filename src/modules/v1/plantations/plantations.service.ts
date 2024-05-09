// NEST.JS
import { Inject, Injectable } from '@nestjs/common';
// INTERFACES
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { PaginatedPlantationsInterface } from '@interfaces/paginatedEntity.interface';
// SCHEMAS
import PlantationEntity from './schemas/plantation.entity';
import { IPlantationRepository } from './interfaces/plantations.interface';
import { FindAllPlantationsUseCase } from './use-cases/find-all-plantations.use-case';

@Injectable()
export default class PlantationService {
  constructor(
    @Inject('IPlantationRepository')
    private repository: IPlantationRepository,
    private findAllPlantationsUseCase: FindAllPlantationsUseCase,
  ) {}

  public async findOne(id: number): Promise<PlantationEntity | null> {
    return this.repository.findOne(id);
  }

  public async findAll(
    options: PaginationParamsInterface,
  ): Promise<PaginatedPlantationsInterface> {
    return this.findAllPlantationsUseCase.execute(options);
  }
}
