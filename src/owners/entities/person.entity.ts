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

@Entity({ name: TableName.PERSON })
export class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'owner_id', type: 'uuid' })
  @OneToOne(() => Owner)
  @JoinColumn()
  owner: Owner;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'date' })
  birthdate: Date;

  @Column({ name: 'birthplace_id', type: 'uuid' })
  @OneToOne(() => Address)
  @JoinColumn()
  birthplace: Address;

  @Column({
    name: 'identity_number',
    unique: true,
    type: 'varchar',
    length: 12,
  })
  identityNumber: string;
}
