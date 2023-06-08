import { Province } from '@addresses/entities/province.entity';
import { TableName } from 'src/config/constants';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Car } from './car.entity';

@Entity({ name: TableName.REGISTRATION_CERT })
export class RegistrationCert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Car, (car) => car.registrationCert)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @Column({ name: 'cert_number', type: 'varchar' })
  certNumber: string;

  @Column({ name: 'registration_number', type: 'varchar' })
  registrationNumber: string;

  @OneToOne(() => Province)
  @JoinColumn({ name: 'registry_province_code' })
  registryProvince: Province;

  @Column({ name: 'created_at', type: Date })
  createdAt: Date;
}
