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

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @OneToOne(() => Account, (account) => account.provider)
  @JoinColumn({ name: 'account_id' })
  account: Account;
}
