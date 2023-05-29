import { Injectable } from '@nestjs/common';
import { InspectionCertRepository } from '@inspection-certs/repositories/inspection-certs.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { InspectionCert } from '@inspection-certs/entities/inspection-cert.entity';
import {
  FilterAreaUnit,
  FilterLevel,
  FilterTimeUnit,
} from '@inspection-certs/enums/filters.enum';
import { FilterData, FilterTime } from '@inspection-certs/types/filter.type';
import { CarRepository } from '@cars/repositories/car.repository';
import { Car } from '@cars/entities/car.entity';
import { Raw } from 'typeorm';
import { CreateInspectionCertDto } from '@inspection-certs/dto/create-inspection-cert.dto';

@Injectable()
export class InspectionCertsService {
  constructor(
    @InjectRepository(InspectionCert)
    private readonly inspectionCertRepository: InspectionCertRepository,
    @InjectRepository(Car)
    private readonly carRepository: CarRepository,
  ) {}

  async findAll() // timeUnit?: keyof FilterTime, // data?: FilterData, // level?: keyof FilterData, // take: number, // page: number,
  // time?: FilterTime,
  {
    const cars = await this.carRepository.find({
      relations: {
        owner: true,
        registrationCert: true,
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
      },
      // where: [
      //   ...(level === 'provider'
      //     ? [
      //         {
      //           inspectionCert: {
      //             provider: { code: data.provider.providerCode },
      //           },
      //         },
      //       ]
      //     : []),
      //   ...(level === 'area'
      //     ? [
      //         {
      //           inspectionCert: {
      //             provider: {
      //               address: {
      //                 commune: {
      //                   ...(data.area.communeCode && {
      //                     code: data.area.communeCode,
      //                   }),
      //                   district: {
      //                     ...(data.area.districtCode && {
      //                       code: data.area.districtCode,
      //                     }),
      //                     province: {
      //                       code: data.area.provinceCode,
      //                     },
      //                   },
      //                 },
      //               },
      //             },
      //           },
      //         },
      //       ]
      //     : []),
      //   ...(timeUnit != null
      //     ? [
      //         {
      //           inspectionCert: {
      //             createdAt:
      //               timeUnit === 'month'
      //                 ? Raw(
      //                     () =>
      //                       'YEAR(created_at) = :year && MONTH(created_at) = :month',
      //                     {
      //                       year: time[timeUnit].year,
      //                       month: time[timeUnit].month,
      //                     },
      //                   )
      //                 : timeUnit === 'quarter'
      //                 ? Raw(
      //                     () =>
      //                       'YEAR(created_at) = :year && QUARTER(created_at) = :quarter',
      //                     {
      //                       year: time[timeUnit].year,
      //                       quarter: time[timeUnit].quarter,
      //                     },
      //                   )
      //                 : Raw(() => 'YEAR(created_at) = :year', {
      //                     year: time[timeUnit].year,
      //                   }),
      //           },
      //         },
      //       ]
      //     : []),
      // ],
      // skip: (page - 1) * take,
      // take,
    });

    return cars;
  }

  async findAllByProvider(providerCode: string) {
    const cars = await this.carRepository.find({
      relations: {
        owner: true,
        registrationCert: true,
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
      },
      where: {
        inspectionCert: {
          provider: {
            code: providerCode,
          },
        },
      },
    });

    return cars;
  }

  async create(createInspectionCertDto: CreateInspectionCertDto) {
    // todo
  }
}
