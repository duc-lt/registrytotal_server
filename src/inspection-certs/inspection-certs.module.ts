import { Module } from '@nestjs/common';
import { InspectionCertsService } from './inspection-certs.service';
import { InspectionCertsController } from './inspection-certs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InspectionCert } from './entities/inspection-cert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InspectionCert])],
  controllers: [InspectionCertsController],
  providers: [InspectionCertsService]
})
export class InspectionCertsModule {}
