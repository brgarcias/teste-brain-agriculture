import { Inject, Injectable } from '@nestjs/common';
import { IFarmRepository } from '../interfaces/farms.interface';

@Injectable()
export class FindAllInAcreFarmsUseCase {
  constructor(
    @Inject('IFarmRepository')
    private repository: IFarmRepository,
  ) {}

  async execute() {
    const farms = await this.repository.findAll();

    const acres = farms.reduce((prev, curr) => prev + curr.totalArea, 0);

    return acres;
  }
}
