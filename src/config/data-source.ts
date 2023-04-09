import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: ['src/**/migrations/*.ts'],
  charset: 'UTF8_GENERAL_CI',
});

export { AppDataSource };
