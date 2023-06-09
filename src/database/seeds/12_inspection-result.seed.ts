import { Car } from '@cars/entities/car.entity';
import { InspectionResult } from '@inspection-certs/entities/inspection-result.entity';
import { InspectionStatus } from '@inspection-certs/enums/inspection-status.enum';
import { DataSource, IsNull, Not } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class InspectionResultSeeder implements Seeder {
  async run(dataSource: DataSource) {
    const inspectionResultRepository =
      dataSource.getRepository(InspectionResult);
    const carRepository = dataSource.getRepository(Car);

    const [failCars, passCars] = await Promise.all([
      carRepository.find({
        relations: {
          inspectionCert: true,
        },
        where: {
          inspectionCert: {
            id: IsNull(),
          },
        },
        select: { id: true },
        take: 5,
      }),
      carRepository.find({
        relations: {
          inspectionCert: true,
        },
        where: {
          inspectionCert: {
            id: Not(IsNull()),
          },
        },
        select: { id: true },
      }),
    ]);

    const inspectionResults = inspectionResultRepository.create(
      [...failCars, ...passCars].map((car) => ({
        car: { id: car.id },
        status: car?.inspectionCert?.id
          ? InspectionStatus.PASS
          : InspectionStatus.FAIL,
        revisitAt: car?.inspectionCert?.id
          ? null
          : new Date(Date.now() + 30 * 24 * 3600 * 1000),
      })),
    );

    await inspectionResultRepository.save(inspectionResults);
  }
}
