import express from "express";
export const router = express.Router();

import Movies from "../controllers/movies";

router.get("/movies/shortenedUrls", async (req, res) =>
  res.send(await new Movies().shortenUrl())
);
router.get("/movies/languages", async (req, res) =>
  res.send(await new Movies().getLanguages())
);

router.get("/movies/totalLengthOfAllMovies", async (req, res) => {
  try {
    const totalLength = await new Movies().getTotalLength();
    res.send({ totalLength: totalLength });
  } catch (err) {
    res.status(500).send({ error: "Failed to retrieve total length" });
  }
});

router.get("/movies/totalImdbVotes", async (req, res) => {
  try {
    const totalVotes = await new Movies().getTotalVotes();
    res.send({ totalVotes: totalVotes });
  } catch (err) {
    res.status(500).send({ error: "Failed to retrieve total votes" });
  }
});

router.get("/movies/imdbUrls", async (req, res) =>
  res.send(await new Movies().getImdbUrls())
);

router.delete("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movieId = await new Movies().deleteMovie(parseInt(id));
    res.send({ deletedMovieId: movieId });
  } catch (err) {
    res.status(500).send({ error: "Failed deleting movie" });
  }
});

router.get("/movies/:imdb", async (req, res) => {
  const { imdb } = req.params;
  return res.send(await new Movies().getMovieByImdID(imdb));
});

router.patch("/movies/:id", async (req, res) => {
  const { id } = req.params;
  res.send(await new Movies().editMovie(req.body, parseInt(id)));
});

router.get("/movies", async (req, res) =>
  res.send(await new Movies().getAllMovies(req.query))
);
router.post("/movies", async (req, res) =>
  res.send(await new Movies().addMovie(req.body))
);
