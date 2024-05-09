import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import PlantationEntity from '@v1/plantations/schemas/plantation.entity';
import FarmEntity from '@v1/farms/schemas/farm.entity';
import ProducerEntity from '@v1/producers/schemas/producer.entity';

@Entity('productions')
export default class ProductionEntity {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn()
  readonly id: number = 1;

  @ManyToOne(() => PlantationEntity, (plantation) => plantation.productions)
  @JoinColumn({ name: 'plantation_id' })
  readonly plantation: PlantationEntity;

  @ManyToOne(() => ProducerEntity, (producer) => producer.productions)
  @JoinColumn({ name: 'producer_id' })
  readonly producer: ProducerEntity;

  @ManyToOne(() => FarmEntity, (farm) => farm.productions)
  @JoinColumn({ name: 'farm_id' })
  readonly farm: FarmEntity;

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
