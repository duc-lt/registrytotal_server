import { Province } from '@addresses/entities/province.entity';
import { TableName } from 'src/config/constants';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: TableName.REGISTRATION_CERT })
export class RegistrationCert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'cert_number', type: 'varchar' })
  certNumber: string;

  @Column({ name: 'registration_number', type: 'varchar' })
  registrationNumber: string;

  @Column({ name: 'registry_province_code', type: 'int' })
  @OneToOne(() => Province)
  @JoinColumn()
  registryProvince: Province;
}
