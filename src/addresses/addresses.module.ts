import { Module } from '@nestjs/common';
import { AddressesService } from './services/addresses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Province } from './entities/province.entity';
import { District } from './entities/district.entity';
import { Commune } from './entities/commune.entity';
import { AddressesController } from './controllers/addresses.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Address, Province, District, Commune])],
  providers: [AddressesService],
  exports: [AddressesService],
  controllers: [AddressesController],
})
export class AddressesModule {}
