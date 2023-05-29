import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OwnerType } from '../enums/owner-types.enum';
import { TableName } from 'src/config/constants';
import { Car } from '@cars/entities/car.entity';
import { Address } from '@addresses/entities/address.entity';

@Entity({ name: TableName.OWNER })
export class Owner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: OwnerType })
  type: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @OneToMany(() => Car, (car) => car.owner)
  cars: Car[];
}
