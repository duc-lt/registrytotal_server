import { Role } from '@accounts/enums/role.enum';
import { hash } from 'argon2';
import { TableName } from 'src/config/constants';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class AccountSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const hashedPassword = await hash('123456');
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query(
      `
      INSERT INTO ${TableName.ACCOUNT} (id, username, password, role) \
      values (uuid(), 'cucdangkiem', ?, ?)
      `,
      [hashedPassword, Role.DEPARTMENT],
    );
    await queryRunner.release();
  }
}
