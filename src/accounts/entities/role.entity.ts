import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Authority } from '../enums/authority.enum';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: Authority })
  name: string;

  @Column({ type: 'enum', enum: [1, 2] })
  priority: number;
}
