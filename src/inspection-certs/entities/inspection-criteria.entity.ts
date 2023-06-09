import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InspectionResult } from './inspection-result.entity';
import { Criteria } from '@inspection-certs/enums/criteria.enum';

@Entity()
export class InspectionCriteria {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => InspectionResult, (result) => result.criteria)
  @JoinColumn({ name: 'result_id' })
  result: InspectionResult;

  @Column({ type: 'enum', enum: Criteria })
  criteria: Criteria;

  @Column({ nullable: true })
  pass?: boolean;
}
