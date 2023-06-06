import { ForbiddenException, Injectable } from '@nestjs/common';
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

  async create(newAddress: {
    streetAddress: string;
    communeCode: number;
    districtCode: number;
    provinceCode: number;
  }) {
    const { streetAddress, communeCode, districtCode, provinceCode } =
      newAddress;
    const isValidAddress = await this.checkValidAddress(
      communeCode,
      districtCode,
      provinceCode,
    );
    if (!isValidAddress) {
      throw new ForbiddenException('Địa chỉ không hợp lệ');
    }

    const address = this.addressRepository.create({
      streetAddress,
      commune: { code: communeCode },
    });

    return this.addressRepository.save(address);
  }

  async findProvinceByName(name: string) {
    return this.provinceRepository.findOneBy({ name });
  }

  async checkValidAddress(
    communeCode: number,
    districtCode: number,
    provinceCode: number,
  ) {
    const address = await this.addressRepository.findOne({
      relations: {
        commune: {
          district: {
            province: true,
          },
        },
      },
      where: {
        commune: {
          code: communeCode,
          district: {
            code: districtCode,
            province: {
              code: provinceCode,
            },
          },
        },
      },
    });

    return !!address;
  }
}
