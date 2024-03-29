import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from '@owners/entities/owner.entity';
import { OwnerRepository } from '@owners/repositories/owner.repository';
import { Person } from '@owners/entities/person.entity';
import { PersonRepository } from '@owners/repositories/person.repository';
import { Organisation } from '@owners/entities/organisation.entity';
import { OrganisationRepository } from '@owners/repositories/organisation.repository';
import { OwnerType } from '@owners/enums/owner-types.enum';
import { AddressesService } from '@addresses/services/addresses.service';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner) private readonly ownerRepository: OwnerRepository,
    @InjectRepository(Person)
    private readonly personRepository: PersonRepository,
    @InjectRepository(Organisation)
    private readonly organisationRepository: OrganisationRepository,
    private readonly addressesService: AddressesService,
  ) {}

  async create(owner: {
    name: string;
    address: {
      streetAddress: string;
      provinceCode: number;
      districtCode: number;
      communeCode: number;
    };
    identityNumber?: string;
    taxId?: string;
  }) {
    const { name, address, identityNumber, taxId } = owner;
    const duplicate = identityNumber
      ? await this.personRepository.findOne({
          relations: { owner: true },
          where: { identityNumber },
        })
      : taxId
      ? await this.organisationRepository.findOne({
          relations: { owner: true },
          where: { taxId },
        })
      : undefined;

    if (duplicate) {
      return duplicate.owner;
    }

    const newAddress = await this.addressesService.create(address);
    const newOwner = this.ownerRepository.create({
      name,
      ...(identityNumber && { type: OwnerType.PERSON }),
      ...(taxId && { type: OwnerType.ORGANISATION }),
      address: newAddress,
    });

    const createdOwner = await this.ownerRepository.save(newOwner);
    if (identityNumber) {
      const person = this.personRepository.create({
        owner: createdOwner,
        identityNumber,
      });
      this.personRepository.save(person);
    }

    if (taxId) {
      const organisation = this.organisationRepository.create({
        owner: createdOwner,
        taxId,
      });
      this.organisationRepository.save(organisation);
    }

    return createdOwner;
  }
}
