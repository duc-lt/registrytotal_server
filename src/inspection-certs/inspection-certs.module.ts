import { Module } from '@nestjs/common';
import { InspectionCertsService } from './inspection-certs.service';
import { InspectionCertsController } from './inspection-certs.controller';

@Module({
  controllers: [InspectionCertsController],
  providers: [InspectionCertsService]
})
export class InspectionCertsModule {}
