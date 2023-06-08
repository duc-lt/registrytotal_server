import { Injectable } from '@nestjs/common';
import { InspectionCertRepository } from '@inspection-certs/repositories/inspection-certs.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { InspectionCert } from '@inspection-certs/entities/inspection-cert.entity';
// import {
//   FilterAreaUnit,
//   FilterLevel,
//   FilterTimeUnit,
// } from '@inspection-certs/enums/filters.enum';
// import { FilterData, FilterTime } from '@inspection-certs/types/filter.type';
// import { CarRepository } from '@cars/repositories/car.repository';
// import { Car } from '@cars/entities/car.entity';
// import { Raw } from 'typeorm';
import { CreateInspectionCertDto } from '@inspection-certs/dto/create-inspection-cert.dto';
import { createRandomString } from 'src/utils';

@Injectable()
export class InspectionCertsService {
  constructor(
    @InjectRepository(InspectionCert)
    private readonly inspectionCertRepository: InspectionCertRepository,
  ) {}

  async findAll() {
    // time?: FilterTime, // timeUnit?: keyof FilterTime, // data?: FilterData, // level?: keyof FilterData, // take: number, // page: number,
    return this.inspectionCertRepository.find({
      relations: {
        // owner: true,
        // registrationCert: true,
        // inspectionCert: {
        //   provider: {
        //     address: {
        //       commune: {
        //         district: {
        //           province: true,
        //         },
        //       },
        //     },
        //   },
        // },
        car: {
          owner: true,
          registrationCert: {
            registryProvince: true,
          },
        },
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
  }

  async findAllByProvider(providerCode: string) {
    return this.inspectionCertRepository.find({
      relations: {
        car: {
          owner: true,
          registrationCert: {
            registryProvince: true,
          },
        },
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
      where: {
        provider: {
          code: providerCode,
        },
      },
    });
  }

  async create(
    createInspectionCertDto: CreateInspectionCertDto,
    providerId: string,
  ) {
    const duplicate = await this.inspectionCertRepository.findOne({
      relations: { car: true },
      where: { car: { id: createInspectionCertDto.carId } },
    });

    if (duplicate) {
      duplicate.expiresAt = new Date(Date.now() + 24 * 365 * 24 * 3600 * 1000);
      return this.inspectionCertRepository.save(duplicate);
    }

    const inspectionCert = this.inspectionCertRepository.create({
      car: {
        id: createInspectionCertDto.carId,
      },
      certNumber: createRandomString(),
      expiresAt: new Date(Date.now() + 24 * 365 * 24 * 3600 * 1000),
      provider: {
        id: providerId,
      },
    });

    return this.inspectionCertRepository.save(inspectionCert);
  }
}
