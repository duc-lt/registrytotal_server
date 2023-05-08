import { ServiceProvider } from '@service-providers/entities/service-provider.entity';
import { TableName } from 'src/config/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: TableName.INSPECTION_CERT })
export class InspectionCert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'cert_number' })
  certNumber: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({
    name: 'expires_at',
    type: 'timestamp',
  })
  expiresAt: Date;

  @Column({ name: 'provider_id', type: 'uuid' })
  @OneToOne(() => ServiceProvider)
  @JoinColumn()
  provider: ServiceProvider;
}
