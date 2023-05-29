import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { TableName } from 'src/config/constants';

export default class ProvinceSeeder implements Seeder {
  private readonly API_URL = 'https://provinces.open-api.vn/api/p/';

  async run(dataSource: DataSource) {
    const res = await fetch(this.API_URL);
    const provinces: any[] = await res.json();
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query(
      `
      INSERT INTO ${TableName.PROVINCE} (name, code) \
      values ? 
      `,
      [provinces.map((province) => [province.name, province.code])],
    );
    await queryRunner.release();
  }
}
