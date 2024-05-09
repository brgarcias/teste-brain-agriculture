import { Inject, Injectable } from '@nestjs/common';
import { IProducerRepository } from '../interfaces/producers.interface';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';

@Injectable()
export class FindAllProducersUseCase {
  constructor(
    @Inject('IProducerRepository')
    private repository: IProducerRepository,
  ) {}

  async execute(options: PaginationParamsInterface) {
    const producers = await this.repository.findAll(options);
    const totalCount = await this.repository.countAll();

    return { paginatedResult: producers, totalCount };
  }
}
