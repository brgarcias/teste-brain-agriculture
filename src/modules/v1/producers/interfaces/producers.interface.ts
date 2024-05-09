import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import ProducerEntity from '../schemas/producer.entity';
import CreateProducerDto from '../dto/create-producer.dto';
import UpdateProducerDto from '../dto/update-producer.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

export interface IProducerRepository {
  createOne(createProducerDto: CreateProducerDto): Promise<ProducerEntity>;
  findOne(id: number): Promise<ProducerEntity | null>;
  findAll(options: PaginationParamsInterface): Promise<ProducerEntity[]>;
  countAll(): Promise<number>;
  updateOne(id: number, data: UpdateProducerDto): Promise<UpdateResult>;
  remove(id: number): Promise<DeleteResult>;
}
