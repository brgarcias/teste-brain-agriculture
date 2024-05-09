// NEST.JS
import { Inject, Injectable } from '@nestjs/common';
// DTO
import CreateProducerDto from '@v1/producers/dto/create-producer.dto';
import UpdateProducerDto from '@v1/producers/dto/update-producer.dto';
// INTERFACES
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { PaginatedProducersInterface } from '@interfaces/paginatedEntity.interface';
// TYPE ORM
import { DeleteResult, UpdateResult } from 'typeorm';
// SCHEMAS
import ProducerEntity from './schemas/producer.entity';
import { IProducerRepository } from './interfaces/producers.interface';
import { FindAllProducersUseCase } from './use-cases/find-all-producers.use-case';

@Injectable()
export default class ProducerService {
  constructor(
    @Inject('IProducerRepository')
    private repository: IProducerRepository,
    private findAllProducersUseCase: FindAllProducersUseCase,
  ) {}

  public async createOne(producer: CreateProducerDto): Promise<ProducerEntity> {
    return this.repository.createOne(producer);
  }

  public async findOne(id: number): Promise<ProducerEntity | null> {
    return this.repository.findOne(id);
  }

  public async findAll(
    options: PaginationParamsInterface,
  ): Promise<PaginatedProducersInterface> {
    return this.findAllProducersUseCase.execute(options);
  }

  public async updateOne(
    id: number,
    data: UpdateProducerDto,
  ): Promise<UpdateResult> {
    return this.repository.updateOne(id, data);
  }

  public remove(id: number): Promise<DeleteResult> {
    return this.repository.remove(id);
  }
}
