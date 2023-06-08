import { Province } from '@addresses/entities/province.entity';
import { Car } from '@cars/entities/car.entity';
import { RegistrationCert } from '@cars/entities/registration-cert.entity';
import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class RegistrationCertSeeder implements Seeder {
  async run(dataSource: DataSource) {
    const registrationCertRepository =
      dataSource.getRepository(RegistrationCert);
    const carRepository = dataSource.getRepository(Car);
    const provinceRepository = dataSource.getRepository(Province);

    const [cars, provinces] = await Promise.all([
      carRepository.find({ select: { id: true } }),
      provinceRepository.find({ select: { code: true } }),
    ]);

    const registrationCerts = registrationCertRepository.create(
      cars.map((car, _, arr) => ({
        car: { id: car.id },
        certNumber: faker.vehicle.vrm(),
        registrationNumber: faker.vehicle.vin(),
        createdAt: faker.date.between('2020-01-01', '2022-12-31'),
        registryProvince: provinces[Math.round(Math.random() * arr.length)],
      })),
    );

    await registrationCertRepository.save(registrationCerts);
  }
}
