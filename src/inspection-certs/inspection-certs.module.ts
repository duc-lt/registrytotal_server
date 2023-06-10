import { Module } from '@nestjs/common';
import { InspectionCertsService } from './services/inspection-certs.service';
import { ProviderInspectionCertsController } from './controllers/provider-inspection-certs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InspectionCert } from './entities/inspection-cert.entity';
import { Car } from '@cars/entities/car.entity';
import { ServiceProvidersModule } from '@service-providers/service-providers.module';
import { InspectionResult } from './entities/inspection-result.entity';
import { InspectionCriteria } from './entities/inspection-criteria.entity';
import { InspectionResultsService } from './services/inspection-results.service';
import { ProviderInspectionResultsController } from './controllers/provider-inspection-results.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InspectionCert,
      Car,
      InspectionResult,
      InspectionCriteria,
    ]),
    ServiceProvidersModule,
  ],
  controllers: [
    ProviderInspectionCertsController,
    ProviderInspectionResultsController,
  ],
  providers: [InspectionCertsService, InspectionResultsService],
})
export class InspectionCertsModule {}
