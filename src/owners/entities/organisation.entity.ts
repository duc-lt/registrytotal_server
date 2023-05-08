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

  @Column({ name: 'owner_id', type: 'uuid' })
  @OneToOne(() => Owner)
  @JoinColumn()
  owner: Owner;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'address_id', type: 'uuid' })
  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;
}
