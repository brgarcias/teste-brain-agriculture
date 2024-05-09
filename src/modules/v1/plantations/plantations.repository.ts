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
import PlantationEntity from './schemas/plantation.entity';
import { IPlantationRepository } from './interfaces/plantations.interface';

@Injectable()
export default class PlantationRepository implements IPlantationRepository {
  constructor(
    @InjectRepository(PlantationEntity)
    private readonly plantationModel: Repository<PlantationEntity>,
  ) {}

  public async findOne(id: number): Promise<PlantationEntity | null> {
    return this.plantationModel.findOne({
      where: [
        {
          id,
        },
      ],
    });
  }

  public async findAll(
    options: PaginationParamsInterface,
  ): Promise<PlantationEntity[]> {
    return this.plantationModel.find({
      cache: true,
      relationLoadStrategy: 'query',
      skip: PaginationUtils.getSkipCount(options.page, options.limit),
      take: PaginationUtils.getLimitCount(options.limit),
    });
  }

  public countAll(): Promise<number> {
    return this.plantationModel.count();
  }
}
