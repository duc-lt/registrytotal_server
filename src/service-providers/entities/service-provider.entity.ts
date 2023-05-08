import { Account } from '@accounts/entities/account.entity';
import { Address } from '@addresses/entities/address.entity';
import { TableName } from 'src/config/constants';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: TableName.SERVICE_PROVIDER })
export class ServiceProvider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column({ name: 'address_id', type: 'uuid' })
  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @Column({ name: 'account_id', type: 'uuid' })
  @OneToOne(() => Account)
  @JoinColumn()
  account: Account;
}
