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
      throw new Error("Movies not found");
    }
  }

  async getMovieByImdID(imdb: any) {
    try {
      const movie = await Movie.findOne({
        where: {
          imdbID: imdb,
        },
      });
      return movie;
    } catch (err: any) {
      throw new Error("Movie not found");
    }
  }

  async deleteMovie(id: any) {
    try {
      const movie = (await Movie.findOne({
        where: {
          Id: id,
        },
      })) as Movie;
      await Movie.remove(movie);
      return movie;
    } catch (err: any) {
      throw new Error("Movie not found");
    }
  }

  async addMovie(params: MovieParams) {
    const {
      Title,
      Year,
      Rated,
      Released,
      Runtime,
      Genre,
      Director,
      Writer,
      Actors,
      Plot,
      Language,
      Country,
      Awards,
      Poster,
      Metascore,
      imdbRating,
      imdbVotes,
      imdbID,
      Type,
      Response,
      Images,
      ComingSoon,
    } = params;

    try {
      const movie = await Movie.create({
        Title: Title,
        Year: Year,
        Rated: Rated,
        Released: Released,
        Runtime: Runtime,
        Genre: Genre,
        Director: Director,
        Writer: Writer,
        Actors: Actors,
        Plot: Plot,
        Language: Language,
        Country: Country,
        Awards: Awards,
        Poster: Poster,
        Metascore: Metascore,
        imdbRating: imdbRating,
        imdbVotes: imdbVotes,
        imdbID: imdbID,
        Type: Type,
        Response: Response,
        Images: Images,
        ComingSoon: ComingSoon,
      });

      await movie.save();
      return movie;
    } catch (err: any) {
      throw new Error("Movie not found");
    }
  }

  async editMovie(params: MovieParams, id: any) {
    const {
      Title,
      Year,
      Rated,
      Released,
      Runtime,
      Genre,
      Director,
      Writer,
      Actors,
      Plot,
      Language,
      Country,
      Awards,
      Poster,
      Metascore,
      imdbRating,
      imdbVotes,
      imdbID,
      Type,
      Response,
      Images,
      ComingSoon,
    } = params;

    try {
      const movie = (await Movie.findOne({
        where: {
          Id: id,
        },
      })) as Movie;

      movie.Title = Title;
      movie.Year = Year;
      movie.Rated = Rated;
      movie.Released = Released;
      movie.Runtime = Runtime;
      movie.Genre = Genre;
      movie.Director = Director;
      movie.Writer = Writer;
      movie.Actors = Actors;
      movie.Plot = Plot;
      movie.Language = Language;
      movie.Country = Country;
      movie.Awards = Awards;
      movie.Poster = Poster;
      movie.Metascore = Metascore;
      movie.imdbRating = imdbRating;
      movie.imdbVotes = imdbVotes;
      movie.imdbID = imdbID;
      movie.Type = Type;
      movie.Response = Response;
      movie.Images = Images;
      movie.ComingSoon = ComingSoon;
      await movie.save();
      return movie;
    } catch (err: any) {
      throw new Error("Movie not found");
    }
  }

  async getTotalLength() {
    try {
      const movies = await Movie.find();
      console.log(movies);
      let total = 0;
      let minutes;
      for (const movie of movies) {
        if (movie.Runtime !== "N/A") {
          if (movie.Type === "series") {
            minutes = parseInt(movie.Runtime.split(" ")[0]);
            let episodePerSeason = 10;
            let seasons = 10;
            total += episodePerSeason * seasons * minutes;
          } else {
            minutes = movie.Runtime.split(" ")[0];
            total += +minutes;
          }
        }
      }
      console.log(total);
      return total;
    } catch (err: any) {
      throw new Error("Movie not found");
    }
  }

  async getTotalVotes() {
    try {
      const movies = await Movie.find();
      console.log(movies);
      let total = 0;
      for (const movie of movies) {
        if (movie.imdbVotes !== "N/A") {
          let votes = parseInt(movie.imdbVotes.replace(",", ""), 10);
          total += +votes;
        }
      }
      console.log(total);
      return total;
    } catch (err: any) {
      throw new Error("Movie not found");
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
      throw new Error("Movie not found");
    }
  }

  async getLanguages() {
    try {
      const movies = await Movie.find();
      console.log(movies);

      const languageMappings: { [key: string]: string } = {
        English: "ENG",
        Spanish: "ESP",
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
      throw new Error("Movie not found");
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
          console.log(randomImageIndex);
          const randomImageURL = await movie.Images[randomImageIndex];
          console.log(randomImageURL);
          const shortURL = await shortenURLs(randomImageURL);
          console.log(shortURL);
          shortenedUrls.push(shortURL);
        })
      );
      return shortenedUrls;
    } catch (err: any) {
      throw new Error("Movie not found");
    }
  }
}
export default Movies;
