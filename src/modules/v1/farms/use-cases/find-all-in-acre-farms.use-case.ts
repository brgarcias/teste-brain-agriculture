import { Inject, Injectable } from '@nestjs/common';
import { IFarmRepository } from '../interfaces/farms.interface';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';

@Injectable()
export class FindAllInAcreFarmsUseCase {
  constructor(
    @Inject('IFarmRepository')
    private repository: IFarmRepository,
  ) {}

  async execute(options: PaginationParamsInterface) {
    const farms = await this.repository.findAll(options);

    const acres = farms.reduce((prev, curr) => prev + curr.totalArea, 0);

    return acres;
  }
}
