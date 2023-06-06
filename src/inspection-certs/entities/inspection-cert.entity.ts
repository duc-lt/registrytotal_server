import { Car } from '@cars/entities/car.entity';
import { ServiceProvider } from '@service-providers/entities/service-provider.entity';
import { TableName } from 'src/config/constants';
import {
  BeforeInsert,
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

  @OneToOne(() => Car, (car) => car.inspectionCert)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @Column({ name: 'cert_number' })
  certNumber: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'expires_at', type: 'timestamp' })
  expiresAt: Date;

  @OneToOne(() => ServiceProvider)
  @JoinColumn({ name: 'provider_id' })
  provider: ServiceProvider;

  @BeforeInsert()
  setExpiresAt() {
    this.expiresAt = new Date(
      this.createdAt.getTime() + 2 * 365 * 24 * 3600 * 1000,
    );
  }
}
