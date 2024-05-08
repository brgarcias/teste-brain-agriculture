import { Module } from '@nestjs/common';
import { Routes, RouterModule } from '@nestjs/core';

const routes: Routes = [
  {
    path: '/v1',
    children: [
      // { path: '/users', module: UsersModule },
    ],
  },
];

@Module({
  imports: [
    RouterModule.register(routes),
    // UsersModule,
  ],
})
export default class V1Module {}
