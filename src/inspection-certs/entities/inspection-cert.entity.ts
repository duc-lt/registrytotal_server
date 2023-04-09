import { ServiceProvider } from '@service-providers/entities/service-provider.entity';
import { TableName } from 'src/config/constants';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: TableName.INSPECTION_CERT })
export class InspectionCert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'cert_number' })
  certNumber: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'expires_at',
    type: 'timestamp',
  })
  expiresAt: Date;

  @Column({ name: 'provider_id' })
  @OneToOne(() => ServiceProvider)
  @JoinColumn()
  provider: ServiceProvider;
}
