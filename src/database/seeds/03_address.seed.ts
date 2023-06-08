import { Address } from '@addresses/entities/address.entity';
import { Commune } from '@addresses/entities/commune.entity';
import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class AddressSeeder implements Seeder {
  async run(dataSource: DataSource) {
    const addressRepository = dataSource.getRepository(Address);
    const communeRepository = dataSource.getRepository(Commune);
    const communes = await communeRepository.find({
      select: { code: true },
      take: 200,
    });
    const addresses = addressRepository.create(
      Array(100)
        .fill(null)
        .map((_) => ({
          streetAddress: faker.address.streetAddress(),
          commune: {
            code: communes[Math.round(Math.random() * communes.length)].code,
          },
        })),
    );

    await addressRepository.save(addresses);
  }
}
