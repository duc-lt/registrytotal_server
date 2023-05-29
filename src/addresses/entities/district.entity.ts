import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Province } from './province.entity';
import { TableName } from 'src/config/constants';

@Entity({ name: TableName.DISTRICT })
export class District {
  @PrimaryColumn({ type: 'int' })
  code: number;

  @Column({ type: 'varchar', length: 40 })
  name: string;

  @OneToOne(() => Province)
  @JoinColumn({ name: 'province_code' })
  province: Province;
}
