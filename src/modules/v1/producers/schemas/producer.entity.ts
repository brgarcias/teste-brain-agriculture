import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Validate } from 'class-validator';
import FarmEntity from '@v1/farms/schemas/farm.entity';
import { DocumentsEnum } from '../enum/document-type.enum';
import { IsCNPJorCPF } from '../validators/validations';
import ProductionEntity from '@v1/productions/schemas/production.entity';

@Entity('producers')
export default class ProducerEntity {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn()
  readonly id: number = 1;

  @ApiProperty({ type: String, maxLength: 64 })
  @Column({ length: 64 })
  readonly name: string = '';

  @ApiProperty({ type: String, maxLength: 32 })
  @Column({ length: 32, unique: true })
  @Validate(IsCNPJorCPF)
  readonly document: string = '';

  @ApiProperty({
    type: String,
    default: DocumentsEnum.CPF,
    enum: DocumentsEnum,
  })
  @Column({
    type: 'enum',
    enum: DocumentsEnum,
    default: DocumentsEnum.CPF,
    name: 'document_type',
  })
  readonly documentType: DocumentsEnum = DocumentsEnum.CPF;

  @OneToMany(() => FarmEntity, (farm) => farm.producer, {
    onDelete: 'CASCADE',
  })
  readonly farms: FarmEntity[];

  @OneToMany(() => ProductionEntity, (production) => production.producer, {
    onDelete: 'CASCADE',
  })
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
