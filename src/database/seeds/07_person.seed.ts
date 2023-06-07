import { Owner } from '@owners/entities/owner.entity';
import { Person } from '@owners/entities/person.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class PersonSeeder implements Seeder {
  async run(dataSource: DataSource) {
    const personRepository = dataSource.getRepository(Person);
    const ownerRepository = dataSource.getRepository(Owner);
  }
}
