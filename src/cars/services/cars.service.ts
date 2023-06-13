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

  async searchByRegistrationNumber(registrationNumber: string) {
    return this.carRepository.findOne({
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
        inspectionResult: {
          criteria: true,
        },
      },
      where: {
        registrationCert: {
          registrationNumber,
        },
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
    const conditions: any = {
      inspectionCert: {},
    };
    const additionalCondition = this.buildConditions(
      level,
      data,
      timeUnit,
      time,
    );

    conditions.inspectionCert = {
      ...conditions.inspectionCert,
      ...additionalCondition,
    };
    const [cars, total] = await this.carRepository.findAndCount({
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
        inspectionResult: true,
      },
      where: conditions,
      skip: (page - 1) * take,
      take,
    });

    const inspectedCarsCount = cars.filter(
      (car) => car.inspectionCert != null,
    ).length;

    return { cars, total, inspectedCarsCount };
  }

  async getCarStats(
    time: { year: number; month: number },
    level: keyof FilterData,
    data: FilterData,
  ) {
    const cars = await this.carRepository.find({
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
        inspectionResult: true,
      },
      where: {
        inspectionCert: {
          ...(level === 'provider' && {
            provider: { code: data.provider.providerCode },
          }),
          ...(level === 'area' && {
            provider: {
              address: {
                commune: {
                  ...(data.area.communeCode && { code: data.area.communeCode }),
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
          }),
          expiresAt: Raw(
            (alias) => `YEAR(${alias}) = :year && MONTH(${alias}) = :month`,
            {
              year: time.year,
              month: time.month,
            },
          ),
        },
      },
    });

    const nearExpireCount = cars.filter(
      (car) =>
        car.inspectionCert?.expiresAt?.getMonth() + 1 === time.month &&
        car.inspectionCert?.expiresAt?.getFullYear() === time.year,
    ).length;

    const newInspectedCount = cars.filter(
      (car) => car.inspectionCert == null,
    ).length;

    return { nearExpireCount, newInspectedCount };
  }

  async findAllByProvider(
    providerCode: string,
    page: number,
    take: number,
    timeUnit?: keyof FilterTime,
    time?: FilterTime,
    registration_num?: string,
  ) {
    const conditions: any = {
      inspectionCert: {
        provider: {
          code: providerCode,
        },
      },
      registrationCert: {},
    };
    if (registration_num) {
      // conditions.registrationCert.registrationNumber = registration_num;
      conditions.inspectionCert.certNumber = registration_num;
    }
    const additionalCondition = this.buildConditions(
      null,
      null,
      timeUnit,
      time,
    );
    delete additionalCondition.provider;
    conditions.inspectionCert = {
      ...conditions.inspectionCert,
      ...additionalCondition,
    };
    const [cars, total] = await this.carRepository.findAndCount({
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
        inspectionResult: true,
      },
      where: conditions,
      skip: (page - 1) * take,
      take,
    });
    return { cars, total };
  }

  buildConditions(
    level?: keyof FilterData,
    data?: FilterData,
    timeUnit?: keyof FilterTime,
    time?: FilterTime,
  ) {
    const conditions: any = {
      provider: {
        address: {
          commune: {
            district: {
              province: {},
            },
          },
        },
      },
    };
    if (level && data) {
      if (level === 'provider') {
        conditions.provider.code = data.provider.providerCode;
      } else if (level === 'area') {
        if (data.area.communeCode) {
          conditions.provider.address.commune.code = data.area.communeCode;
        }
        if (data.area.districtCode) {
          conditions.provider.address.commune.district.code =
            data.area.districtCode;
        }
        if (data.area.provinceCode) {
          conditions.provider.address.commune.district.province.code =
            data.area.provinceCode;
        }
      }
    }
    if (timeUnit && time) {
      switch (timeUnit) {
        case 'month':
          conditions.createdAt = Raw(
            (alias) => `YEAR(${alias}) = :year && MONTH(${alias}) = :month`,
            {
              year: time[timeUnit].year,
              month: time[timeUnit].month,
            },
          );
          break;
        case 'quarter':
          conditions.createdAt = Raw(
            (alias) => `YEAR(${alias}) = :year && QUARTER(${alias}) = :quarter`,
            {
              year: time[timeUnit].year,
              quarter: time[timeUnit].quarter,
            },
          );
          break;
        case 'year':
          conditions.createdAt = Raw((alias) => `YEAR(${alias}) = :year`, {
            year: time[timeUnit].year,
          });
          break;
        default:
          break;
      }
    }
    return conditions;
  }

  async getCarStatsByProvider(
    time: { year: number; month: number },
    providerCode: string,
  ) {
    const cars = await this.carRepository.find({
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
        inspectionResult: true,
      },
      where: {
        inspectionCert: {
          provider: { code: providerCode },
          expiresAt: Raw(
            (alias) => `YEAR(${alias}) = :year && MONTH(${alias}) = :month`,
            {
              year: time.year,
              month: time.month,
            },
          ),
        },
      },
    });

    const nearExpireCount = cars.filter(
      (car) =>
        car.inspectionCert?.expiresAt?.getMonth() + 1 === time.month &&
        car.inspectionCert?.expiresAt?.getFullYear() === time.year,
    ).length;

    const newInspectedCount = cars.filter(
      (car) => car.inspectionCert == null,
    ).length;

    return { nearExpireCount, newInspectedCount };
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
