import { Inject, Injectable } from '@nestjs/common';
import { IPlantationRepository } from '../interfaces/plantations.interface';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';

@Injectable()
export class FindAllPlantationsUseCase {
  constructor(
    @Inject('IPlantationRepository')
    private repository: IPlantationRepository,
  ) {}

  async execute(options: PaginationParamsInterface) {
    const plantations = await this.repository.findAll(options);
    const totalCount = await this.repository.countAll();

    return { paginatedResult: plantations, totalCount };
  }
}
