import { Movie } from "../model/Movie";
import { shortenURLs } from "../shorten-url";
import { MovieParams, MovieQuerableParams } from "../util/types";

class Movies {
  async getAllMovies(params: MovieQuerableParams) {
    const { actor, imdbSort, yearSort } = params;
    try {
      let query = Movie.createQueryBuilder("movie");
      if (actor) {
        query = query.where("movie.Actors LIKE :actor", {
          actor: `%${actor}%`,
        });
      }
      if (imdbSort) {
        const imdbSortDirection =
          imdbSort.toUpperCase() === "ASC" ? "ASC" : "DESC";
        query = query.orderBy("movie.imdbRating", imdbSortDirection);
      }

      if (yearSort) {
        const yearSortDirection =
          yearSort.toUpperCase() === "ASC" ? "ASC" : "DESC";
        query = query.orderBy("movie.Year", yearSortDirection);
      }
      let movies;

      if (imdbSort) {
        movies = await query
          .select(["movie.Title", "movie.imdbRating"])
          .getMany();
      } else {
        movies = await query.getMany();
      }
      return movies;
    } catch (err: any) {
      console.error(err);
      throw new Error("Movies not found");
    }
  }

  async getMovieByImdID(imdb: string) {
    try {
      const movie = await Movie.findOne({
        where: {
          imdbID: imdb,
        },
      });
      return movie;
    } catch (err: any) {
      console.error(err);
      throw new Error("Movie not found");
    }
  }

  async deleteMovie(id: number) {
    try {
      const movie = (await Movie.findOne({
        where: {
          Id: id,
        },
      })) as Movie;
      await Movie.remove(movie);
      return id;
    } catch (err: any) {
      console.error(err);
      throw new Error("Delete movie failed");
    }
  }

  async addMovie(params: MovieParams) {
    try {
      const movie = new Movie();
      Object.assign(movie, params);
      const newMovie = await movie.save();
      return newMovie;
    } catch (err: any) {
      console.error(err);
      throw new Error("Add movie failed");
    }
  }

  async editMovie(params: Partial<MovieParams>, id: number) {
    try {
      const movie = await Movie.findOne({
        where: {
          Id: id,
        },
      });
      if (!movie) {
        throw new Error("Movie not found");
      }
      Object.assign(movie, params);
      await movie.save();

      return movie;
    } catch (err: any) {
      console.error(err);
      throw new Error("Editing movie failed");
    }
  }

  async getTotalLength() {
    try {
      const movies = await Movie.find();

      const total = movies.reduce((accumulator, movie) => {
        let minutes;
        if (movie.Runtime !== "N/A" && movie.Type === "series") {
          minutes = parseInt(movie.Runtime.split(" ")[0]);
          const episodePerSeason = 10;
          const seasons = 10;
          return accumulator + episodePerSeason * seasons * minutes;
        } else if (movie.Runtime !== "N/A" && movie.Type === "movie") {
          minutes = parseInt(movie.Runtime.split(" ")[0]);
          return accumulator + minutes;
        }
        return accumulator;
      }, 0);

      console.log(total);
      return total;
    } catch (err) {
      console.error(err);
      throw new Error("Calculating total length failed");
    }
  }

  async getTotalVotes() {
    try {
      const movies = await Movie.find();
      console.log(movies);

      const total = movies.reduce((accumulator, movie) => {
        if (movie.imdbVotes !== "N/A") {
          const votes = parseInt(movie.imdbVotes.replace(",", ""), 10);
          return accumulator + votes;
        }
        return accumulator;
      }, 0);

      console.log(total);
      return total;
    } catch (err) {
      console.error(err);
      throw new Error("Calculating total votes failed");
    }
  }

  async getImdbUrls() {
    try {
      const movies = await Movie.find();
      console.log(movies);
      const urlBase = "https://www.imdb.com/";
      let urls = [];
      for (const movie of movies) {
        let movieUrl =
          urlBase + movie.Title.replace(/\s/g, "") + "/" + movie.imdbID + "/";
        urls.push(movieUrl);
      }
      return urls;
    } catch (err: any) {
      console.error(err);
      throw new Error("Fetching imdbUrls failed");
    }
  }

  async getLanguages() {
    try {
      const movies = await Movie.find();
      console.log(movies);

      const languageMappings: { [key: string]: string } = {
        English: "ENG",
        Spanish: "ESP",
        French: "FRA",
        Russian: "RS",
      };

      const shortenLanguages: string[] = [];

      for (const movie of movies) {
        const languages = movie.Language.split(",");

        languages.forEach((language) => {
          const trimmedLanguage = language.trim();
          const shortenLanguage = languageMappings[trimmedLanguage] || "ENG";
          console.log(shortenLanguage);
          shortenLanguages.push(shortenLanguage);
        });
      }
      return shortenLanguages;
    } catch (err: any) {
      console.error(err);
      throw new Error("Shortening languages failed");
    }
  }

  async shortenUrl() {
    try {
      const movies = await Movie.find();
      let shortenedUrls: String[] = [];

      const shortenedURLs = await Promise.all(
        movies.map(async (movie) => {
          const randomImageIndex = Math.floor(
            Math.random() * movie.Images.length
          );
          const randomImageURL = await movie.Images[randomImageIndex];
          const shortURL = await shortenURLs(randomImageURL);
          shortenedUrls.push(shortURL);
        })
      );
      return shortenedUrls;
    } catch (err: any) {
      console.error(err);
      throw new Error("Shortening urls failed");
    }
  }
}
export default Movies;
