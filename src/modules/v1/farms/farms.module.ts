// NESTJS
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// STATUS FILES
import FarmsController from './farms.controller';
import FarmsService from './farms.service';
import FarmEntity from './schemas/farm.entity';
import FarmRepository from './farms.repository';
import { FindAllInAcreFarmsUseCase } from './use-cases/find-all-in-acre-farms.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([FarmEntity])],
  controllers: [FarmsController],
  providers: [
    FarmsService,
    FarmRepository,
    FindAllInAcreFarmsUseCase,
    {
      provide: 'IFarmRepository',
      useExisting: FarmRepository,
    },
  ],
  exports: [FarmsService, FarmRepository],
})
export default class FarmsModule {}
