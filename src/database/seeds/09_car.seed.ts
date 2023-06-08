import { Car } from '@cars/entities/car.entity';
import { CarUse } from '@cars/enums/car-uses.enum';
import { faker } from '@faker-js/faker';
import { Owner } from '@owners/entities/owner.entity';
import { getRandomEnumValue } from 'src/utils';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class CarSeeder implements Seeder {
  async run(dataSource: DataSource) {
    const ownerRepository = dataSource.getRepository(Owner);
    const carRepository = dataSource.getRepository(Car);
    const owners = await ownerRepository.find({ select: { id: true } });
    const cars = carRepository.create(
      owners.map((owner) => ({
        owner: { id: owner.id },
        maker: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        version: Math.round(Math.random() * 20 + 2000).toString(),
        usedFor: getRandomEnumValue(CarUse),
      })),
    );

    await carRepository.save(cars);
  }
}
