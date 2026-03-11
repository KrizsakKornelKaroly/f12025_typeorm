import "reflect-metadata";
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config({ path: './src/.env' });

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DBHOST,
  port: Number(process.env.DBPORT),
  username: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DBNAME,
  synchronize: true,
  logging: false,
  entities: ['src/entities/*.ts']
});
