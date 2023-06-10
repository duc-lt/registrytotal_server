import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RegistrationCert } from './registration-cert.entity';
import { InspectionCert } from '@inspection-certs/entities/inspection-cert.entity';
import { CarUse } from '../enums/car-uses.enum';
import { Owner } from '@owners/entities/owner.entity';
import { TableName } from 'src/config/constants';
import { InspectionResult } from '@inspection-certs/entities/inspection-result.entity';

@Entity({ name: TableName.CAR })
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Owner, (owner) => owner.cars)
  @JoinColumn({ name: 'owner_id' })
  owner: Owner;

  @OneToOne(() => RegistrationCert, (cert) => cert.car)
  registrationCert: RegistrationCert;

  @OneToOne(() => InspectionCert, (cert) => cert.car)
  inspectionCert?: InspectionCert;

  @OneToOne(() => InspectionResult, (result) => result.car)
  inspectionResult?: InspectionResult;

  @Column({ type: 'varchar', length: 30 })
  maker: string;

  @Column({ type: 'varchar', length: 30 })
  model: string;

  @Column({ type: 'varchar', length: 30 })
  version: string;

  @Column({ name: 'used_for', type: 'enum', enum: CarUse })
  usedFor: string;
}
