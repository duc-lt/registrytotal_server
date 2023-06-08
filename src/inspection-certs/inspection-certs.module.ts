import { Module } from '@nestjs/common';
import { InspectionCertsService } from './services/inspection-certs.service';
import { ProviderInspectionCertsController } from './controllers/provider-inspection-certs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InspectionCert } from './entities/inspection-cert.entity';
import { Car } from '@cars/entities/car.entity';
import { ServiceProvidersModule } from '@service-providers/service-providers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InspectionCert, Car]),
    ServiceProvidersModule,
  ],
  controllers: [ProviderInspectionCertsController],
  providers: [InspectionCertsService],
})
export class InspectionCertsModule {}
