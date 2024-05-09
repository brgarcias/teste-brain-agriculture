import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import ProducerEntity from '@v1/producers/schemas/producer.entity';
import ProductionEntity from '@v1/productions/schemas/production.entity';

@Entity('farms')
export default class FarmEntity {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn()
  readonly id: number = 1;

  @ApiProperty({ type: String, maxLength: 64 })
  @IsString()
  @Column({ length: 64, unique: true })
  readonly name: string = '';

  @ApiProperty({ type: String, maxLength: 128 })
  @IsString()
  @Column({ length: 128 })
  readonly city: string = '';

  @ApiProperty({ type: String, maxLength: 2 })
  @IsString()
  @Column({ length: 2 })
  readonly state: string = '';

  @ApiProperty({ type: Number })
  @IsNumber()
  @Column({ name: 'agricultural_area' })
  readonly agriculturalArea: number = 0;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Column({ name: 'vegetation_area' })
  readonly vegetationArea: number = 0;

  @ApiProperty({ type: Number })
  @Column({ name: 'total_area', nullable: true })
  totalArea: number | null = null;

  @ManyToOne(() => ProducerEntity, (producer) => producer.farms, {
    onDelete: 'CASCADE',
    cascade: ['recover'],
  })
  @JoinColumn({ name: 'producer_id' })
  readonly producer: ProducerEntity;

  @OneToMany(() => ProductionEntity, (production) => production.farm)
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

  @BeforeInsert()
  @BeforeUpdate()
  async updateTotalArea() {
    this.totalArea = this.agriculturalArea + this.vegetationArea;
  }
}
