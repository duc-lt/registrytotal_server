import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { District } from './district.entity';
import { TableName } from 'src/config/constants';

@Entity({ name: TableName.COMMUNE })
export class Commune {
  @PrimaryColumn({ type: 'int' })
  code: number;

  @Column({ type: 'varchar', length: 40 })
  name: string;

  @Column({ name: 'district_code' })
  @OneToOne(() => District)
  @JoinColumn()
  district: District;
}
