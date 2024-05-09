// NEST.JS
import { Inject, Injectable } from '@nestjs/common';
import { FindAllInAcreFarmsUseCase } from './use-cases/find-all-in-acre-farms.use-case';
import { IFarmRepository } from './interfaces/farms.interface';

@Injectable()
export default class FarmService {
  constructor(
    @Inject('IFarmRepository')
    private repository: IFarmRepository,
    private findAcresFarmsUseCase: FindAllInAcreFarmsUseCase,
  ) {}

  public async findQuantity(): Promise<number> {
    return this.repository.countAll();
  }

  public async findAllInAcre(): Promise<number> {
    return this.findAcresFarmsUseCase.execute();
  }
}
