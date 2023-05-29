import { Commune } from '@addresses/entities/commune.entity';
import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { TableName } from 'src/config/constants';

export default class CommuneSeeder implements Seeder {
  private readonly API_URL = 'https://provinces.open-api.vn/api/w';

  async run(dataSource: DataSource) {
    const res = await fetch(this.API_URL);
    const communes = await res.json();
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query(
      `
      INSERT INTO ${TableName.COMMUNE} (name, code, district_code) \
      values ?
      `,
      [
        communes.map((commune) => [
          commune.name,
          commune.code,
          commune.district_code,
        ]),
      ],
    );
    await queryRunner.release();
  }
}
