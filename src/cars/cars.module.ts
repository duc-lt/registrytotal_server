import { Module } from '@nestjs/common';
import { CarsService } from './services/cars.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { RegistrationCert } from './entities/registration-cert.entity';
import { XlsxModule } from 'src/xlsx/xlsx.module';
import { AddressesModule } from '@addresses/addresses.module';
import { OwnersModule } from '@owners/owners.module';
import { DepartmentCarsController } from './controllers/department-cars.controller';
import { ProviderCarsController } from './controllers/provider-cars.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car, RegistrationCert]),
    XlsxModule,
    AddressesModule,
    OwnersModule,
  ],
  controllers: [
    DepartmentCarsController,
    ProviderCarsController,
  ],
  providers: [CarsService],
})
export class CarsModule {}
