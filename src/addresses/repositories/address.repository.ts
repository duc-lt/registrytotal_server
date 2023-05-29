import { Address } from '@addresses/entities/address.entity';
import { Repository } from 'typeorm';

export class AddressRepository extends Repository<Address> {}
