import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { TableName } from 'src/config/constants';

@Entity({ name: TableName.ACCOUNT })
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'role_id' })
  @OneToOne(() => Role)
  @JoinColumn()
  role: Role;

  @Column({ type: 'varchar', length: 20 })
  username: string;

  @Column({ type: 'text' })
  password: string;
}
