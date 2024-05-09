import { Inject, Injectable } from '@nestjs/common';
import { IFarmRepository } from '../interfaces/farms.interface';

@Injectable()
export class FindAllQuantityFarmsUseCase {
  constructor(
    @Inject('IFarmRepository')
    private repository: IFarmRepository,
  ) {}

  async execute() {
    return this.repository.countAll();
  }
}
