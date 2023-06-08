import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateCarDto } from '../dto/create-car.dto';
import { UpdateCarDto } from '../dto/update-car.dto';
import { XlsxService } from 'src/xlsx/services/xlsx.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from '@cars/entities/car.entity';
import { CarRepository } from '@cars/repositories/car.repository';
import { Owner } from '@owners/entities/owner.entity';
import { OwnerRepository } from '@owners/repositories/owner.repository';
import { Person } from '@owners/entities/person.entity';
import { AddressesService } from '@addresses/services/addresses.service';
import { OwnersService } from '@owners/services/owners.service';
import { RegistrationCert } from '@cars/entities/registration-cert.entity';
import { RegistrationCertRepository } from '@cars/repositories/registration-cert.repository';
import { Province } from '@addresses/entities/province.entity';
import { IsNull, Raw } from 'typeorm';
import { FilterData, FilterTime } from '@cars/types/filter.type';

@Injectable()
export class CarsService {
  constructor(
    private readonly xlsxService: XlsxService,
    private readonly addressesService: AddressesService,
    private readonly ownersService: OwnersService,
    @InjectRepository(Car) private readonly carRepository: CarRepository,
    @InjectRepository(RegistrationCert)
    private readonly registrationCertRepository: RegistrationCertRepository,
  ) {}

  async create(path: string) {
    const rows = await this.xlsxService.read(path);
    return Promise.all(
      rows.map(async (row) => {
        const {
          owner,
          specs: { maker, model, version },
          usedFor,
          registrationInfo: {
            certNumber,
            createdAt,
            registrationNumber,
            registryProvinceCode,
          },
        } = row;

        const newOwner = await this.ownersService.create(owner);

        const car = this.carRepository.create({
          owner: newOwner,
          maker,
          model,
          version,
          usedFor,
        });
        const newCar = await this.carRepository.save(car);

        const registrationCert = this.registrationCertRepository.create({
          car: newCar,
          certNumber,
          createdAt,
          registrationNumber,
          registryProvince: { code: registryProvinceCode },
        });

        this.registrationCertRepository.save(registrationCert);
      }),
    );
  }

  async searchByRegistrationNumber(certNumber: string) {
    return this.carRepository.find({
      relations: {
        registrationCert: true,
        inspectionCert: true,
        owner: {
          address: true,
        },
      },
      where: {
        registrationCert: {
          certNumber,
        },
        inspectionCert: { id: IsNull() },
      },
    });
  }

  async findAll(
    page: number,
    take: number,
    level?: keyof FilterData,
    data?: FilterData,
    timeUnit?: keyof FilterTime,
    time?: FilterTime,
  ) {
    return this.carRepository.find({
      relations: {
        registrationCert: {
          registryProvince: true,
        },
        inspectionCert: {
          provider: {
            address: {
              commune: {
                district: {
                  province: true,
                },
              },
            },
          },
        },
        owner: true,
      },
      where: {
        inspectionCert: {
          ...(level === 'provider'
            ? { provider: { code: data.provider.providerCode } }
            : level === 'area'
            ? {
                provider: {
                  address: {
                    commune: {
                      ...(data.area.communeCode && {
                        code: data.area.communeCode,
                      }),
                      district: {
                        ...(data.area.districtCode && {
                          code: data.area.districtCode,
                        }),
                        province: {
                          code: data.area.provinceCode,
                        },
                      },
                    },
                  },
                },
              }
            : {}),
          ...(timeUnit != null
            ? {
                createdAt:
                  timeUnit === 'month'
                    ? Raw(
                        (alias) =>
                          `YEAR(${alias}) = :year && MONTH(${alias}) = :month`,
                        {
                          year: time[timeUnit].year,
                          month: time[timeUnit].month,
                        },
                      )
                    : timeUnit === 'quarter'
                    ? Raw(
                        (alias) =>
                          `YEAR(${alias}) = :year && QUARTER(${alias}) = :quarter`,
                        {
                          year: time[timeUnit].year,
                          quarter: time[timeUnit].quarter,
                        },
                      )
                    : Raw((alias) => `YEAR(${alias}) = :year`, {
                        year: time[timeUnit].year,
                      }),
              }
            : {}),
        },
      },
      skip: (page - 1) * take,
      take,
    });
  }

  async findAllByProvider(
    providerCode: string,
    page: number,
    take: number,
    timeUnit?: keyof FilterTime,
    time?: FilterTime,
  ) {
    return this.carRepository.find({
      relations: {
        registrationCert: {
          registryProvince: true,
        },
        inspectionCert: {
          provider: {
            address: {
              commune: {
                district: {
                  province: true,
                },
              },
            },
          },
        },
        owner: true,
      },
      where: {
        inspectionCert: {
          provider: {
            code: providerCode,
          },
          ...(timeUnit != null
            ? {
                createdAt:
                  timeUnit === 'month'
                    ? Raw(
                        (alias) =>
                          `YEAR(${alias}) = :year && MONTH(${alias}) = :month`,
                        {
                          year: time[timeUnit].year,
                          month: time[timeUnit].month,
                        },
                      )
                    : timeUnit === 'quarter'
                    ? Raw(
                        (alias) =>
                          `YEAR(${alias}) = :year && QUARTER(${alias}) = :quarter`,
                        {
                          year: time[timeUnit].year,
                          quarter: time[timeUnit].quarter,
                        },
                      )
                    : Raw((alias) => `YEAR(${alias}) = :year`, {
                        year: time[timeUnit].year,
                      }),
              }
            : {}),
        },
      },
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} car`;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: string) {
    return `This action removes a #${id} car`;
  }
}
