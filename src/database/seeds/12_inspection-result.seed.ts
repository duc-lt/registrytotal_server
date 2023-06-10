import { Car } from '@cars/entities/car.entity';
import { faker } from '@faker-js/faker';
import { InspectionResult } from '@inspection-certs/entities/inspection-result.entity';
import { InspectionStatus } from '@inspection-certs/enums/inspection-status.enum';
import { ServiceProvider } from '@service-providers/entities/service-provider.entity';
import { DataSource, IsNull, Not } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class InspectionResultSeeder implements Seeder {
  async run(dataSource: DataSource) {
    const inspectionResultRepository =
      dataSource.getRepository(InspectionResult);
    const carRepository = dataSource.getRepository(Car);
    const providerRepository = dataSource.getRepository(ServiceProvider);

    const [failCars, passCars, providers] = await Promise.all([
      carRepository.find({
        relations: {
          inspectionCert: {
            provider: true,
          },
        },
        where: {
          inspectionCert: {
            id: IsNull(),
          },
        },
        select: {
          id: true,
        },
        take: 3,
      }),
      carRepository.find({
        relations: {
          inspectionCert: {
            provider: true,
          },
        },
        where: {
          inspectionCert: {
            id: Not(IsNull()),
          },
        },
        select: {
          id: true,
          inspectionCert: { provider: { id: true }, id: true },
        },
      }),
      providerRepository.find({
        select: { id: true },
      }),
    ]);

    const inspectionResults = inspectionResultRepository.create(
      [...failCars, ...passCars].map((car) => ({
        car: { id: car.id },
        status: car?.inspectionCert?.id
          ? InspectionStatus.PASS
          : InspectionStatus.FAIL,
        inspectorName: faker.name.fullName(),
        provider: {
          id: car?.inspectionCert?.id
            ? car?.inspectionCert?.provider?.id
            : providers[Math.round(Math.random() * providers.length)].id,
        },
      })),
    );

    await inspectionResultRepository.save(inspectionResults);
  }
}
