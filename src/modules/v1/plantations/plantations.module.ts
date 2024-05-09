// NESTJS
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// STATUS FILES
import PlantationsController from './plantations.controller';
import PlantationsService from './plantations.service';
import PlantationEntity from './schemas/plantation.entity';
import PlantationsRepository from './plantations.repository';
import { FindAllPlantationsUseCase } from './use-cases/find-all-plantations.use-case';
import PlantationRepository from './plantations.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PlantationEntity])],
  controllers: [PlantationsController],
  providers: [
    PlantationsService,
    PlantationsRepository,
    FindAllPlantationsUseCase,
    {
      provide: 'IPlantationRepository',
      useExisting: PlantationRepository,
    },
  ],
  exports: [PlantationsService, PlantationsRepository],
})
export default class PlantationsModule {}
