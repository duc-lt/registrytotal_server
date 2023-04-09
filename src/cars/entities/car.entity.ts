import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RegistrationCert } from './registration-cert.entity';
import { InspectionCert } from '@inspection-certs/entities/inspection-cert.entity';
import { CarUse } from '../enums/car-uses.enum';
import { Owner } from '@owners/entities/owner.entity';
import { TableName } from 'src/config/constants';

@Entity({ name: TableName.CAR })
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'owner_id' })
  @OneToOne(() => Owner)
  @JoinColumn()
  owner: Owner;

  @Column({ name: 'registration_cert_id' })
  @OneToOne(() => RegistrationCert)
  @JoinColumn()
  registrationCert: RegistrationCert;

  @Column({ name: 'inspection_cert_id', nullable: true })
  @OneToOne(() => InspectionCert)
  @JoinColumn()
  inspectionCert?: InspectionCert;

  @Column({ type: 'varchar', length: 30 })
  maker: string;

  @Column({ type: 'varchar', length: 30 })
  model: string;

  @Column({ type: 'varchar', length: 30 })
  version: string;

  @Column({ name: 'used_for', type: 'enum', enum: CarUse })
  usedFor: string;
}
