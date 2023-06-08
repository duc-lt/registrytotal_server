import { Address } from '@addresses/entities/address.entity';
import { Commune } from '@addresses/entities/commune.entity';
import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class AddressSeeder implements Seeder {
  async run(dataSource: DataSource) {
    const addressRepository = dataSource.getRepository(Address);
    const communeRepository = dataSource.getRepository(Commune);
    const communesCount = await communeRepository.count();
    const addresses = addressRepository.create(
      Array(50)
        .fill(null)
        .map((_) => ({
          streetAddress: faker.address.streetAddress(),
          commune: {
            code: Math.round(Math.random() * communesCount + 1),
          },
        })),
    );

    await addressRepository.save(addresses);
  }
}
