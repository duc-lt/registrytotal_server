import { Person } from '@owners/entities/person.entity';
import { Repository } from 'typeorm';

export class PersonRepository extends Repository<Person> {}
