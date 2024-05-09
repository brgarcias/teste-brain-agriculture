// NEST.JS
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// TYPE ORM
import { Repository } from 'typeorm/index';
// SCHEMA
import FarmEntity from './schemas/farm.entity';
import { IFarmRepository } from './interfaces/farms.interface';

@Injectable()
export default class FarmRepository implements IFarmRepository {
  constructor(
    @InjectRepository(FarmEntity)
    private readonly farmModel: Repository<FarmEntity>,
  ) {}

  public async findAll(): Promise<FarmEntity[]> {
    return this.farmModel.find({
      select: {
        totalArea: true,
      },
    });
  }

  public countAll(): Promise<number> {
    return this.farmModel.count();
  }
}
