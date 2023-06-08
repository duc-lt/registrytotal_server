import { Owner } from '@owners/entities/owner.entity';
import { Person } from '@owners/entities/person.entity';
import { OwnerType } from '@owners/enums/owner-types.enum';
import { createRandomString } from 'src/utils';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class PersonSeeder implements Seeder {
  async run(dataSource: DataSource) {
    const personRepository = dataSource.getRepository(Person);
    const ownerRepository = dataSource.getRepository(Owner);
    const personOwners = await ownerRepository.find({
      where: { type: OwnerType.PERSON },
      select: { id: true },
    });

    const persons = personRepository.create(
      personOwners.map((owner) => ({
        owner: { id: owner.id },
        identityNumber: createRandomString(12),
      })),
    );

    await personRepository.save(persons);
  }
}
