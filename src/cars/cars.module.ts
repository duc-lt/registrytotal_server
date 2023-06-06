import { Module } from '@nestjs/common';
import { CarsService } from './services/cars.service';
import { CarsController } from './controllers/cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { RegistrationCert } from './entities/registration-cert.entity';
import { XlsxModule } from 'src/xlsx/xlsx.module';
import { AddressesModule } from '@addresses/addresses.module';
import { OwnersModule } from '@owners/owners.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car, RegistrationCert]),
    XlsxModule,
    AddressesModule,
    OwnersModule,
  ],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
