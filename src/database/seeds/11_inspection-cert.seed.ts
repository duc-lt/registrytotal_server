import { Car } from '@cars/entities/car.entity';
import { faker } from '@faker-js/faker';
import { InspectionCert } from '@inspection-certs/entities/inspection-cert.entity';
import { ServiceProvider } from '@service-providers/entities/service-provider.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class InspectionCertSeeder implements Seeder {
  async run(dataSource: DataSource) {
    const inspectionCertRepository = dataSource.getRepository(InspectionCert);
    const carRepository = dataSource.getRepository(Car);
    const providerRepository = dataSource.getRepository(ServiceProvider);

    const [cars, providers] = await Promise.all([
      carRepository.find({ select: { id: true }, skip: 3, take: 5 }),
      providerRepository.find({ select: { id: true }, skip: 3, take: 5 }),
    ]);

    const inspectionCerts = inspectionCertRepository.create(
      cars.map((car, index) => ({
        car: { id: car.id },
        certNumber: faker.vehicle.vrm(),
        expiresAt: new Date(Date.now() + 2 * 365 * 24 * 3600 * 1000),
        provider: { id: providers[index].id },
      })),
    );

    await inspectionCertRepository.save(inspectionCerts);
  }
}
