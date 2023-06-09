import { CreateInspectionResultDto } from '@inspection-certs/dto/create-inspection-result.dto';
import { InspectionCriteria } from '@inspection-certs/entities/inspection-criteria.entity';
import { InspectionResult } from '@inspection-certs/entities/inspection-result.entity';
import { Criteria } from '@inspection-certs/enums/criteria.enum';
import { InspectionStatus } from '@inspection-certs/enums/inspection-status.enum';
import { InspectionCriteriaRepository } from '@inspection-certs/repositories/inspection-criteria.repository';
import { InspectionResultRepository } from '@inspection-certs/repositories/inspection-result.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InspectionResultsService {
  constructor(
    @InjectRepository(InspectionResult)
    private readonly inspectionResultRepository: InspectionResultRepository,
    @InjectRepository(InspectionCriteria)
    private readonly inspectionCriteriaRepository: InspectionCriteriaRepository,
  ) {}

  async create(createInspectionResultDto: CreateInspectionResultDto) {
    const inspectionResult = this.inspectionResultRepository.create({
      car: { id: createInspectionResultDto.carId },
      revisitAt: null,
    });

    const newInspectionResult = await this.inspectionResultRepository.save(
      inspectionResult,
    );
    const inspectionCriteria = this.inspectionCriteriaRepository.create(
      Object.keys(createInspectionResultDto.result).map((key) => {
        return {
          result: { id: newInspectionResult.id },
          criteria: Criteria[key],
          pass: createInspectionResultDto.result[key],
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
