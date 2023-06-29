import fs from "fs";

import { Movie } from "./model/Movie";
import { MovieParams } from "./util/types";

export async function insertMoviesData(): Promise<void> {
  const movies = JSON.parse(fs.readFileSync("./movies.json", "utf8"));

  const promises = movies.map(async (movie: MovieParams) => {
    let newMovie = new Movie();
    Object.assign(newMovie, movie);
    newMovie = await newMovie.save();
  });

  await Promise.all(promises);

  console.log("Movies data inserted into the database.");
}
