import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import ProductionEntity from '@v1/productions/schemas/production.entity';

@Entity('plantations')
export default class PlantationEntity {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn()
  readonly id: number = 1;

  @ApiProperty({ type: String, maxLength: 64 })
  @IsString()
  @Column({ length: 64 })
  readonly name: string = '';

  @OneToMany(() => ProductionEntity, (production) => production.plantation)
  readonly productions: ProductionEntity[];

  @ApiProperty({ type: 'timestamp', default: new Date() })
  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  readonly createdAt: Date = new Date();

  @ApiProperty({ type: 'timestamp', default: new Date() })
  @CreateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  readonly updatedAt: Date = new Date();
}
