import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OwnerType } from '../enums/owner-types.enum';
import { TableName } from 'src/config/constants';

@Entity({ name: TableName.OWNER })
export class Owner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: OwnerType })
  type: string;
}
