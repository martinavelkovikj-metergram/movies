import { DataSource } from "typeorm"
import {Movie} from "../model/Movie"

export const AppSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "martina",
    database: "moviesDb",
    entities:[Movie],
    synchronize: true

});