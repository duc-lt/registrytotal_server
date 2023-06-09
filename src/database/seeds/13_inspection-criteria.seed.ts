import { InspectionCriteria } from '@inspection-certs/entities/inspection-criteria.entity';
import { InspectionResult } from '@inspection-certs/entities/inspection-result.entity';
import { Criteria } from '@inspection-certs/enums/criteria.enum';
import { InspectionStatus } from '@inspection-certs/enums/inspection-status.enum';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class InspectionCriteriaSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const inspectionCriteriaRepository =
      dataSource.getRepository(InspectionCriteria);
    const inspectionResultRepository =
      dataSource.getRepository(InspectionResult);

    const inspectionResults = await inspectionResultRepository.find({
      select: { id: true },
    });
    const inspectionCriteria = inspectionCriteriaRepository.create(
      inspectionResults
        .map((result) => {
          return Object.values(Criteria).map((criteria, index) => ({
            result: { id: result.id },
            criteria,
            pass:
              result.status === InspectionStatus.PASS
                ? true
                : index === 0
                ? false
                : Math.random() > 0.5,
          }));
        })
        .flat(),
    );

    await inspectionCriteriaRepository.save(inspectionCriteria);
  }
}
