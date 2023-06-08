import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Commune } from '@addresses/entities/commune.entity';

export default class CommuneSeeder implements Seeder {
  private readonly API_URL = 'https://provinces.open-api.vn/api/w';

  async run(dataSource: DataSource) {
    const res = await fetch(this.API_URL);
    const communes = await res.json();
    const repository = dataSource.getRepository(Commune);
    await repository.insert(
      communes.map((commune) => ({
        name: commune.name,
        code: commune.code,
        district: {
          code: commune.district_code,
        },
      })),
    );
  }
}
