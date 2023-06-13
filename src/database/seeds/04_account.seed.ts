import { Role } from '@accounts/enums/role.enum';
import { hash } from 'argon2';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Account } from '../../accounts/entities/account.entity';
import { createRandomString } from 'src/utils';

export default class AccountSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const accountRepository = dataSource.getRepository(Account);
    const accounts = accountRepository.create([
      {
        role: Role.DEPARTMENT,
        username: 'cucdangkiem',
        password: '12345678',
      },
      ...Array(40)
        .fill(null)
        .map((_) => ({
          role: Role.SERVICE_PROVIDER,
          username: createRandomString(5),
          password: '12345678',
        })),
    ]);

    await accountRepository.save(accounts);
  }
}
