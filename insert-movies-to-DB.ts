import fs from "fs";

import { Movie } from "./model/Movie";
import { MovieParams } from "./util/types";

export async function insertMoviesData(): Promise<void> {
  const movies = JSON.parse(fs.readFileSync("./movies.json", "utf8"));

  await Promise.all(movies.map((movie: MovieParams) => new Movie(movie).save()));

  console.log("Movies data inserted into the database.");
}
