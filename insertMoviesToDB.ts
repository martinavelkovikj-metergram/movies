import{ Movie } from "./model/Movie" 
import fs from 'fs';

export async function insertMoviesData(): Promise<void> {
    const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf8'));
  
    for (const movie of movies) {
      const newMovie = new Movie();
      newMovie.Title = movie.Title;
      newMovie.Year = movie.Year;
      newMovie.Rated = movie.Rated;
      newMovie.Released = movie.Released;
      newMovie.Runtime = movie.Runtime;
      newMovie.Genre = movie.Genre;
      newMovie.Director = movie.Director;
      newMovie.Writer = movie.Writer;
      newMovie.Actors = movie.Actors;
      newMovie.Plot = movie.Plot;
      newMovie.Language = movie.Language;
      newMovie.Country = movie.Country;
      newMovie.Awards = movie.Awards;
      newMovie.Poster = movie.Poster;
      newMovie.Metascore = movie.Metascore;
      newMovie.imdbRating = movie.imdbRating;
      newMovie.imdbVotes = movie.imdbVotes;
      newMovie.imdbID = movie.imdbID;
      newMovie.Type = movie.Type;
      newMovie.Response = movie.Response;
      newMovie.Images = movie.Images;
      newMovie.ComingSoon = movie.ComingSoon || false;
  
      await newMovie.save();
    }
  
    console.log('Movies data inserted into the database.');
  }