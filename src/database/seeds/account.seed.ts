import { Role } from '@accounts/enums/role.enum';
import { hash } from 'argon2';
import { TableName } from 'src/config/constants';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { MOCK_SERVICE_PROVIDERS } from '../mock-data/service-providers.mock';
import { v1 as uuidv1 } from 'uuid';

export default class AccountSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const hashedPassword = await hash('123456');
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query(
      `
      INSERT INTO ${TableName.ACCOUNT} (id, username, password, role) \
      VALUES ?
      `,
      [
        [
          [uuidv1(), 'cucdangkiem', hashedPassword, Role.DEPARTMENT],
          ...MOCK_SERVICE_PROVIDERS.map((provider) => [
            uuidv1(),
            provider.code,
            hashedPassword,
            Role.SERVICE_PROVIDER,
          ]),
        ],
      ],
    );

    await queryRunner.query(
      `
      INSERT INTO ${TableName.ADDRESS} (id, street_address, commune_code) \
      VALUES ?
      `,
      [
        MOCK_SERVICE_PROVIDERS.map((provider) => [
          uuidv1(),
          provider.address,
          provider.commune,
        ]),
      ],
    );
    const [addresses, accounts] = await Promise.all([
      queryRunner.query(
        `
        SELECT * FROM ${TableName.ADDRESS}
        `,
      ),
      queryRunner.query(
        `
        SELECT id, username FROM ${TableName.ACCOUNT} WHERE role = ?
        `,
        [Role.SERVICE_PROVIDER],
      ),
    ]);
    const addressesMap = new Map(
      addresses.map((address) => [
        `${address.street_address}:${address.commune_code}`,
        address.id,
      ]),
    );
    const accountsMap = new Map(
      accounts.map((account) => [account.username, account.id]),
    );
    await queryRunner.query(
      `
      INSERT INTO ${TableName.SERVICE_PROVIDER} (id, code, address_id, account_id) \
      VALUES ?
      `,
      [
        MOCK_SERVICE_PROVIDERS.map((provider) => [
          uuidv1(),
          provider.code,
          addressesMap.get(`${provider.address}:${provider.commune}`),
          accountsMap.get(provider.code),
        ]),
      ],
    );

    await queryRunner.release();
  }
}
