import { TableName } from 'src/config/constants';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: TableName.PROVINCE })
export class Province {
  @PrimaryColumn({ type: 'int' })
  code: number;

  @Column({ type: 'varchar', length: 40 })
  name: string;
}
