import { OwnerType } from '@owners/enums/owner-types.enum';
import { Owner } from '../../owners/entities/owner.entity';
import { setSeederFactory } from 'typeorm-extension';
import { v1 as uuidv1 } from 'uuid';

export default setSeederFactory(Owner, (faker) => {
  const owner = new Owner();
  owner.id = uuidv1();
  const ownerTypes = Object.values(OwnerType);
  owner.type = ownerTypes[Math.round(Math.random() * ownerTypes.length)];
  owner.name =
    owner.type === OwnerType.PERSON
      ? faker.name.fullName()
      : faker.company.name();

  return owner;
});
