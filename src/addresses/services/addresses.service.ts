import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';
import { AddressRepository } from '@addresses/repositories/address.repository';
import { ProvinceRepository } from '@addresses/repositories/province.repository';
import { DistrictRepository } from '@addresses/repositories/district.repository';
import { CommuneRepository } from '@addresses/repositories/commune.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from '@addresses/entities/address.entity';
import { Province } from '@addresses/entities/province.entity';
import { District } from '@addresses/entities/district.entity';
import { Commune } from '@addresses/entities/commune.entity';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: AddressRepository,
    @InjectRepository(Province)
    private readonly provinceRepository: ProvinceRepository,
    @InjectRepository(District)
    private readonly districtRepository: DistrictRepository,
    @InjectRepository(Commune)
    private readonly communeRepository: CommuneRepository,
  ) {}

  async findProvinceByName(name: string) {
    return this.provinceRepository.findOneBy({ name });
  }
}
