import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Owner } from './owner.entity';
import { TableName } from 'src/config/constants';

@Entity({ name: TableName.PERSON })
export class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Owner)
  @JoinColumn({ name: 'owner_id' })
  owner: Owner;

  @Column({
    name: 'identity_number',
    unique: true,
    type: 'varchar',
    length: 12,
  })
  identityNumber: string;
}
