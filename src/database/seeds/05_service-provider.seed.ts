import { ServiceProvider } from '../../service-providers/entities/service-provider.entity';
import { Account } from '../../accounts/entities/account.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Address } from '../../addresses/entities/address.entity';

export default class ServiceProviderSeeder implements Seeder {
  async run(dataSource: DataSource) {
    const accountRepository = dataSource.getRepository(Account);
    const providerRepository = dataSource.getRepository(ServiceProvider);
    const addressRepository = dataSource.getRepository(Address);
    const accounts = await accountRepository.find({
      select: { id: true, username: true },
    });
    const addresses = await addressRepository.find({
      select: { id: true },
      skip: 0,
      take: accounts.length,
    });

    const providers = providerRepository.create(
      accounts.map((account, index) => ({
        code: account.username,
        address: {
          id: addresses[index].id,
        },
        account: {
          id: account.id,
        },
      })),
    );

    await providerRepository.save(providers);
  }
}
