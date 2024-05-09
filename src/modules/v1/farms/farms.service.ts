// NEST.JS
import { Inject, Injectable } from '@nestjs/common';
import { FindAllQuantityFarmsUseCase } from './use-cases/find-all-quantity-farms.use-case';
import { FindAllInAcreFarmsUseCase } from './use-cases/find-all-in-acre-farms.use-case';

@Injectable()
export default class FarmService {
  constructor(
    @Inject('IFarmRepository')
    private findQuantityFarmsUseCase: FindAllQuantityFarmsUseCase,
    private findAcresFarmsUseCase: FindAllInAcreFarmsUseCase,
  ) {}

  public async findQuantity(): Promise<number> {
    return this.findQuantityFarmsUseCase.execute();
  }

  public async findAllInAcre(): Promise<number> {
    return this.findAcresFarmsUseCase.execute();
  }
}
