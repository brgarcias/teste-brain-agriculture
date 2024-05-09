// NEST.JS
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// TYPE ORM
import { Repository } from 'typeorm/index';
// SCHEMA
import FarmEntity from './schemas/farm.entity';
import { IFarmRepository } from './interfaces/farms.interface';
import paginationUtils from '@utils/pagination.utils';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';

@Injectable()
export default class FarmRepository implements IFarmRepository {
  constructor(
    @InjectRepository(FarmEntity)
    private readonly farmModel: Repository<FarmEntity>,
  ) {}

  public async findAll(
    options: PaginationParamsInterface,
  ): Promise<FarmEntity[]> {
    return this.farmModel.find({
      loadEagerRelations: true,
      cache: true,
      relationLoadStrategy: 'join',
      skip: paginationUtils.getSkipCount(options.page, options.limit),
      take: paginationUtils.getLimitCount(options.limit),
    });
  }

  public countAll(): Promise<number> {
    return this.farmModel.count();
  }

  public async findOne(id: number): Promise<FarmEntity> {
    return this.farmModel.findOne({
      loadEagerRelations: true,
      where: [
        {
          id,
        },
      ],
    });
  }
}
