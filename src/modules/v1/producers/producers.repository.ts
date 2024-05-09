// NEST.JS
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// TYPE ORM
import { DeleteResult, Repository, UpdateResult } from 'typeorm/index';
// INTERFACES
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
// UTILS
import PaginationUtils from '@utils/pagination.utils';
// SCHEMA
import ProducerEntity from './schemas/producer.entity';
// DTO
import CreateProducerDto from './dto/create-producer.dto';
import UpdateProducerDto from './dto/update-producer.dto';
import { IProducerRepository } from './interfaces/producers.interface';

@Injectable()
export default class ProducerRepository implements IProducerRepository {
  constructor(
    @InjectRepository(ProducerEntity)
    private readonly producerModel: Repository<ProducerEntity>,
  ) {}

  public createOne(producer: CreateProducerDto): Promise<ProducerEntity> {
    return this.producerModel.save(producer);
  }

  public async findOne(id: number): Promise<ProducerEntity | null> {
    return this.producerModel.findOne({
      where: [
        {
          id,
        },
      ],
    });
  }

  public async findAll(
    options: PaginationParamsInterface,
  ): Promise<ProducerEntity[]> {
    return this.producerModel.find({
      cache: true,
      relationLoadStrategy: 'query',
      skip: PaginationUtils.getSkipCount(options.page, options.limit),
      take: PaginationUtils.getLimitCount(options.limit),
    });
  }

  public countAll(): Promise<number> {
    return this.producerModel.count();
  }

  public async updateOne(
    id: number,
    data: UpdateProducerDto,
  ): Promise<UpdateResult> {
    return this.producerModel.update(id, data);
  }

  public remove(id: number): Promise<DeleteResult> {
    return this.producerModel.delete(id);
  }
}
