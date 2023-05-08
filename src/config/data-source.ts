import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {},
  migrations: ['src/**/migrations/*.ts'],
});

export { AppDataSource };
