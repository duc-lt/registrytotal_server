import { Injectable } from '@nestjs/common';
import { InspectionCertRepository } from '@inspection-certs/repositories/inspection-cert.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { InspectionCert } from '@inspection-certs/entities/inspection-cert.entity';
import { CreateInspectionCertDto } from '@inspection-certs/dto/create-inspection-cert.dto';
import { createRandomString } from 'src/utils';
import { InspectionStatus } from '@inspection-certs/enums/inspection-status.enum';
import { Car } from '@cars/entities/car.entity';
import { CarRepository } from '@cars/repositories/car.repository';
import { IsNull, Not } from 'typeorm';

@Injectable()
export class InspectionCertsService {
  constructor(
    @InjectRepository(InspectionCert)
    private readonly inspectionCertRepository: InspectionCertRepository,
    @InjectRepository(Car)
    private readonly carRepository: CarRepository,
  ) {}

  async create(
    createInspectionCertDto: CreateInspectionCertDto,
    providerId: string,
  ) {
    const duplicate = await this.carRepository.findOne({
      relations: { inspectionResult: true },
      where: {
        id: createInspectionCertDto.carId,
        inspectionResult: {
          status: InspectionStatus.PASS,
        },
        inspectionCert: {
          id: Not(IsNull()),
        },
      },
      order: { inspectionResult: { createdAt: 'desc' } },
    });

    if (duplicate) {
      duplicate.inspectionCert.certNumber = createRandomString();
      duplicate.inspectionCert.expiresAt = new Date(
        Date.now() + 2 * 365 * 24 * 3600 * 1000,
      );
      return this.inspectionCertRepository.save(duplicate.inspectionCert);
    }

    const inspectionCert = this.inspectionCertRepository.create({
      car: {
        id: createInspectionCertDto.carId,
      },
      certNumber: createRandomString(),
      expiresAt: new Date(Date.now() + 2 * 365 * 24 * 3600 * 1000),
      provider: {
        id: providerId,
      },
    });

    return this.inspectionCertRepository.save(inspectionCert);
  }
}
