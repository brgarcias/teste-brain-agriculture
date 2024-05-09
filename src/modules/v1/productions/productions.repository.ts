// NEST.JS
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// TYPE ORM
import { Repository } from 'typeorm/index';
// INTERFACES
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
// UTILS
import PaginationUtils from '@utils/pagination.utils';
// SCHEMA
import ProductionEntity from './schemas/production.entity';
import { IProductionRepository } from './interfaces/productions.interface';
import CreateProductionDto from './dto/create-production.dto';

@Injectable()
export default class ProductionRepository implements IProductionRepository {
  constructor(
    @InjectRepository(ProductionEntity)
    private readonly productionModel: Repository<ProductionEntity>,
  ) {}

  public createOne(production: CreateProductionDto): Promise<ProductionEntity> {
    return this.productionModel.save(production);
  }

  public async findOne(id: number): Promise<ProductionEntity | null> {
    return this.productionModel.findOne({
      loadEagerRelations: true,
      where: [
        {
          id,
        },
      ],
    });
  }

  public async findAll(
    options: PaginationParamsInterface,
  ): Promise<ProductionEntity[]> {
    return this.productionModel.find({
      loadEagerRelations: true,
      cache: true,
      relationLoadStrategy: 'join',
      skip: PaginationUtils.getSkipCount(options.page, options.limit),
      take: PaginationUtils.getLimitCount(options.limit),
    });
  }

  public countAll(): Promise<number> {
    return this.productionModel.count();
  }
}
