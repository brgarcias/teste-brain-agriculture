import { Inject, Injectable } from '@nestjs/common';
import { IProductionRepository } from '../interfaces/productions.interface';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';

@Injectable()
export class FindAllProductionsUseCase {
  constructor(
    @Inject('IProductionRepository')
    private repository: IProductionRepository,
  ) {}

  async execute(options: PaginationParamsInterface) {
    const productions = await this.repository.findAll(options);
    const totalCount = await this.repository.countAll();

    return { paginatedResult: productions, totalCount };
  }
}
