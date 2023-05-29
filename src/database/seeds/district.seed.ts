import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { TableName } from 'src/config/constants';

export default class DistrictSeeder implements Seeder {
  private readonly API_URL = 'https://provinces.open-api.vn/api/d/';

  async run(dataSource: DataSource) {
    const res = await fetch(this.API_URL);
    const districts = await res.json();
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query(
      `
      INSERT INTO ${TableName.DISTRICT} (name, code, province_code) \
      values ?
      `,
      [
        districts.map((district) => [
          district.name,
          district.code,
          district.province_code,
        ]),
      ],
    );
    await queryRunner.release();
  }
}
