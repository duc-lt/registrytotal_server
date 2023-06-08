import { Address } from '@addresses/entities/address.entity';
import { faker } from '@faker-js/faker';
import { Owner } from '@owners/entities/owner.entity';
import { OwnerType } from '@owners/enums/owner-types.enum';
import { ServiceProvider } from '@service-providers/entities/service-provider.entity';
import { getRandomEnumValue } from 'src/utils';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class OwnerSeeder implements Seeder {
  async run(dataSource: DataSource) {
    const ownerRepository = dataSource.getRepository(Owner);
    const addressRepository = dataSource.getRepository(Address);
    const providerRepository = dataSource.getRepository(ServiceProvider);
    const providersCount = await providerRepository.count();
    const addresses = await addressRepository.find({
      select: { id: true },
      skip: providersCount,
      take: 60,
    });
    const owners = ownerRepository.create(
      addresses.map((address) => {
        const owner = ownerRepository.create({
          type: getRandomEnumValue(OwnerType),
          address: {
            id: address.id,
          },
        });
        owner.name =
          owner.type === OwnerType.ORGANISATION
            ? faker.company.name()
            : faker.name.fullName();
        return owner;
      }),
    );

    await ownerRepository.save(owners);
  }
}
