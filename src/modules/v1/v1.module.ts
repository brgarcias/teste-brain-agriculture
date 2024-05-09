import { Module } from '@nestjs/common';
import { Routes, RouterModule } from '@nestjs/core';
import ProducersModule from './producers/producers.module';
import FarmsModule from './farms/farms.module';
import PlantationsModule from './plantations/plantations.module';
import ProductionsModule from './productions/productions.module';

const routes: Routes = [
  {
    path: '/v1',
    children: [
      { path: '/producers', module: ProducersModule },
      { path: '/farms', module: FarmsModule },
      { path: '/plantations', module: PlantationsModule },
      { path: '/productions', module: ProductionsModule },
    ],
  },
];

@Module({
  imports: [
    RouterModule.register(routes),
    ProducersModule,
    FarmsModule,
    PlantationsModule,
    ProductionsModule,
  ],
})
export default class V1Module {}
