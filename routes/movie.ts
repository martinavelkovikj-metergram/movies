import express from "express";
import { addMovie, deleteMovie, editMovie, getAllMovies, getMovieByImdID } from "../controllers/movies";

export const router=express.Router();

router.get('/movies', getAllMovies)
router.get('/movies/:imdb', getMovieByImdID )
router.delete('/movies/:id', deleteMovie )
router.post('/addMovie', addMovie)
router.put('/editMovie/:id',editMovie)