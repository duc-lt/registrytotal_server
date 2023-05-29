import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { District } from './district.entity';
import { TableName } from 'src/config/constants';

@Entity({ name: TableName.COMMUNE })
export class Commune {
  @PrimaryColumn({ type: 'int' })
  code: number;

  @Column({ type: 'varchar', length: 40 })
  name: string;

  @OneToOne(() => District)
  @JoinColumn({ name: 'district_code' })
  district: District;
}
