import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Province } from './entities/province.entity';
import { District } from './entities/district.entity';
import { Commune } from './entities/commune.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address, Province, District, Commune])],
  controllers: [AddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
