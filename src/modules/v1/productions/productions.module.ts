// NESTJS
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// STATUS FILES
import ProductionsController from './productions.controller';
import ProductionsService from './productions.service';
import ProductionEntity from './schemas/production.entity';
import ProductionsRepository from './productions.repository';
import { FindAllProductionsUseCase } from './use-cases/find-all-productions.use-case';
import ProductionRepository from './productions.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductionEntity])],
  controllers: [ProductionsController],
  providers: [
    ProductionsService,
    ProductionsRepository,
    FindAllProductionsUseCase,
    {
      provide: 'IProductionRepository',
      useExisting: ProductionRepository,
    },
  ],
  exports: [ProductionsService, ProductionsRepository],
})
export default class ProductionsModule {}
