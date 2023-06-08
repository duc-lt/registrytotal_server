import { Organisation } from '@owners/entities/organisation.entity';
import { Owner } from '@owners/entities/owner.entity';
import { OwnerType } from '@owners/enums/owner-types.enum';
import { createRandomString } from 'src/utils';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class OrganisationSeeder implements Seeder {
  async run(dataSource: DataSource) {
    const ownerRepository = dataSource.getRepository(Owner);
    const organisationRepository = dataSource.getRepository(Organisation);
    const organisationOwners = await ownerRepository.find({
      where: { type: OwnerType.ORGANISATION },
      select: { id: true },
    });
    const organisations = organisationRepository.create(
      organisationOwners.map((owner) => ({
        owner: { id: owner.id },
        taxId: createRandomString(7),
      })),
    );

    await organisationRepository.save(organisations);
  }
}
