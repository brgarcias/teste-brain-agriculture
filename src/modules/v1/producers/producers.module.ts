// NESTJS
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// STATUS FILES
import ProducersController from './producers.controller';
import ProducersService from './producers.service';
import ProducerEntity from './schemas/producer.entity';
import ProducersRepository from './producers.repository';
import ProducerRepository from './producers.repository';
import { FindAllProducersUseCase } from './use-cases/find-all-producers.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ProducerEntity])],
  controllers: [ProducersController],
  providers: [
    ProducersService,
    ProducersRepository,
    FindAllProducersUseCase,
    {
      provide: 'IProducerRepository',
      useExisting: ProducerRepository,
    },
  ],
  exports: [ProducersService, ProducersRepository],
})
export default class ProducersModule {}
