import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Commune } from './commune.entity';
import { TableName } from 'src/config/constants';

@Entity({ name: TableName.ADDRESS })
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'street_address', type: 'varchar', length: 200 })
  streetAddress: string;

  @OneToOne(() => Commune)
  @JoinColumn({ name: 'commune_code' })
  commune: Commune;
}
