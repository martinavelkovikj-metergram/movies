import { DataSource } from "typeorm";
import { Movie } from "../model/Movie";
import dotenv from 'dotenv';

dotenv.config();

export const AppSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Movie],
  synchronize: true,
});
