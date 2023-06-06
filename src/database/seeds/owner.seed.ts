import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class OwnerSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {}
}
