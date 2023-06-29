import { DataSource } from "typeorm";
import { Movie } from "../model/Movie";
// import dotenv from "dotenv";

// dotenv.config();

import { config } from '../config';

export const AppSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  entities: [Movie],
  synchronize: true,
});
