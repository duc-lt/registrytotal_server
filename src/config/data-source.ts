import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

config();

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {},
  migrations: ['src/**/migrations/*.ts'],
  seeds: ['**/database/seeds/**/*.js'],
};

const AppDataSource = new DataSource(options);

export { AppDataSource };
