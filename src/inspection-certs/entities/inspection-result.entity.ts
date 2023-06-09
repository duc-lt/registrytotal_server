import { Car } from '@cars/entities/car.entity';
import { InspectionStatus } from '@inspection-certs/enums/inspection-status.enum';
import { TableName } from 'src/config/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InspectionCriteria } from './inspection-criteria.entity';

@Entity({ name: TableName.INSPECTION_RESULT })
export class InspectionResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Car, (car) => car.inspectionResult)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @Column({
    type: 'enum',
    enum: InspectionStatus,
    default: InspectionStatus.DRAFT,
  })
  status: InspectionStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'revisit_at', type: 'timestamp', nullable: true })
  revisitAt?: Date;

  @OneToMany(() => InspectionCriteria, (criteria) => criteria.result)
  criteria: InspectionCriteria[];
}
