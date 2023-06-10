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
import { ServiceProvider } from '@service-providers/entities/service-provider.entity';

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

  @Column({ name: 'inspector_name' })
  inspectorName: string;

  @OneToOne(() => ServiceProvider)
  @JoinColumn({ name: 'provider_id' })
  provider: ServiceProvider;

  @OneToMany(() => InspectionCriteria, (criteria) => criteria.result)
  criteria: InspectionCriteria[];
}
