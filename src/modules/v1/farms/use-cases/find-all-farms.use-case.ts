import { Inject, Injectable } from '@nestjs/common';
import { IFarmRepository } from '../interfaces/farms.interface';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';

@Injectable()
export class FindAllFarmsUseCase {
  constructor(
    @Inject('IFarmRepository')
    private repository: IFarmRepository,
  ) {}

  async execute(options: PaginationParamsInterface) {
    const productions = await this.repository.findAll(options);
    const totalCount = await this.repository.countAll();

    return { paginatedResult: productions, totalCount };
  }
}
