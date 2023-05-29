import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Owner } from './owner.entity';
import { Address } from '@addresses/entities/address.entity';
import { TableName } from 'src/config/constants';

@Entity({ name: TableName.ORGANISATION })
export class Organisation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Owner)
  @JoinColumn({ name: 'owner_id' })
  owner: Owner;

  @Column({ type: 'varchar', length: 20, name: 'tax_id' })
  taxId: string;
}
