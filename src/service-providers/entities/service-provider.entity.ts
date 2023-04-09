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

  @Column({ name: 'address_id' })
  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @Column({ name: 'account_id' })
  @OneToOne(() => Account)
  @JoinColumn()
  account: Account;
}
