import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { District } from '@addresses/entities/district.entity';

export default class DistrictSeeder implements Seeder {
  private readonly API_URL = 'https://provinces.open-api.vn/api/d/';

  async run(dataSource: DataSource) {
    const res = await fetch(this.API_URL);
    const districts: any[] = await res.json();
    const repository = dataSource.getRepository(District);
    await repository.insert(
      districts.map((district) => ({
        name: district.name,
        code: district.code,
        province: {
          code: district.province_code,
        },
      })),
    );
  }
}
