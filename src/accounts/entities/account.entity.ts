import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TableName } from 'src/config/constants';
import { Exclude } from 'class-transformer';
import { hash } from 'argon2';
import { Role } from '@accounts/enums/role.enum';

@Entity({ name: TableName.ACCOUNT })
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: Role, default: Role.SERVICE_PROVIDER })
  role: Role;

  @Column({ type: 'varchar', length: 20 })
  username: string;

  @Column({ type: 'text' })
  @Exclude()
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Exclude()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password);
  }
}
