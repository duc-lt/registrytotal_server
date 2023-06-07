import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Province } from '@addresses/entities/province.entity';

export default class ProvinceSeeder implements Seeder {
  private readonly API_URL = 'https://provinces.open-api.vn/api/p/';

  async run(dataSource: DataSource) {
    const res = await fetch(this.API_URL);
    const provinces: any[] = await res.json();
    const repository = dataSource.getRepository(Province);
    await repository.insert(
      provinces.map((province) => ({
        name: province.name,
        code: province.code,
      })),
    );
  }
}
