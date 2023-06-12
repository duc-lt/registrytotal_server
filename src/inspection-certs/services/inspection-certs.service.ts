import { Injectable } from '@nestjs/common';
import { InspectionCertRepository } from '@inspection-certs/repositories/inspection-cert.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { InspectionCert } from '@inspection-certs/entities/inspection-cert.entity';
import { CreateInspectionCertDto } from '@inspection-certs/dto/create-inspection-cert.dto';
import { createRandomString } from 'src/utils';
import { InspectionStatus } from '@inspection-certs/enums/inspection-status.enum';

@Injectable()
export class InspectionCertsService {
  constructor(
    @InjectRepository(InspectionCert)
    private readonly inspectionCertRepository: InspectionCertRepository,
  ) {}

  async create(
    createInspectionCertDto: CreateInspectionCertDto,
    providerId: string,
  ) {
    const duplicate = await this.inspectionCertRepository.findOne({
      relations: { car: { inspectionResult: true } },
      where: {
        car: {
          id: createInspectionCertDto.carId,
          inspectionResult: {
            status: InspectionStatus.PASS,
          },
        },
      },
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
