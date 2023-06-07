import { Address } from '@addresses/entities/address.entity';
import { faker } from '@faker-js/faker';
import { Owner } from '@owners/entities/owner.entity';
import { OwnerType } from '@owners/enums/owner-types.enum';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class OwnerSeeder implements Seeder {
  async run(dataSource: DataSource) {
    const ownerRepository = dataSource.getRepository(Owner);
    const addressRepository = dataSource.getRepository(Address);
    const addresses = await addressRepository.find({
      select: { id: true },
      skip: 20,
      take: 100,
    });
    const ownerTypes = Object.values(OwnerType);
    const owners = ownerRepository.create(
      addresses.map((address) => {
        const owner = ownerRepository.create({
          type: ownerTypes[Math.floor(Math.random() * ownerTypes.length)],
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
