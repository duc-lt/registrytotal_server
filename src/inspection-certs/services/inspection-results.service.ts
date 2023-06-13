import { Car } from '@cars/entities/car.entity';
import { CarRepository } from '@cars/repositories/car.repository';
import { CreateInspectionResultDto } from '@inspection-certs/dto/create-inspection-result.dto';
import { InspectionCriteria } from '@inspection-certs/entities/inspection-criteria.entity';
import { InspectionResult } from '@inspection-certs/entities/inspection-result.entity';
import { Criteria } from '@inspection-certs/enums/criteria.enum';
import { InspectionStatus } from '@inspection-certs/enums/inspection-status.enum';
import { InspectionCriteriaRepository } from '@inspection-certs/repositories/inspection-criteria.repository';
import { InspectionResultRepository } from '@inspection-certs/repositories/inspection-result.repository';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, MoreThan } from 'typeorm';

@Injectable()
export class InspectionResultsService {
  constructor(
    @InjectRepository(InspectionResult)
    private readonly inspectionResultRepository: InspectionResultRepository,
    @InjectRepository(InspectionCriteria)
    private readonly inspectionCriteriaRepository: InspectionCriteriaRepository,
    @InjectRepository(Car)
    private readonly carRepository: CarRepository,
  ) {}

  async create(
    createInspectionResultDto: CreateInspectionResultDto,
    providerId: string,
  ) {
    const { carId, result, inspectorName } = createInspectionResultDto;
    const car = await this.carRepository.findOne({
      relations: {
        inspectionCert: true,
        inspectionResult: true,
      },
      where: {
        inspectionCert: { expiresAt: MoreThan(new Date()) },
        id: carId,
      },

      select: { id: true },
      order: { inspectionResult: { createdAt: 'desc' } },
    });

    if (car) {
      throw new ForbiddenException('Xe không thuộc danh sách cần đăng kiểm');
    }
    const inspectionResult = this.inspectionResultRepository.create({
      car: { id: carId },
      inspectorName,
      provider: { id: providerId },
    });

    const newInspectionResult = await this.inspectionResultRepository.save(
      inspectionResult,
    );
    const inspectionCriteria = this.inspectionCriteriaRepository.create(
      Object.keys(result).map((key) => {
        return {
          result: { id: newInspectionResult.id },
          criteria: Criteria[key.toUpperCase()],
          pass: result[key],
        };
      }),
    );

    if (inspectionCriteria.every((criteria) => criteria.pass)) {
      newInspectionResult.status = InspectionStatus.PASS;
    } else {
      newInspectionResult.status = InspectionStatus.FAIL;
    }

    return Promise.all([
      this.inspectionResultRepository.save(newInspectionResult),
      this.inspectionCriteriaRepository.save(inspectionCriteria),
    ]);
  }
}
