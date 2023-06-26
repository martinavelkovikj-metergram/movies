import { AppSource } from "./util/database"
import express from "express";
import { insertMoviesData } from "./insertMoviesToDB";
import{ Movie } from "./model/Movie" 
import { router } from "./routes/movie";


const app = express();
app.use(express.json());
app.use(router);

AppSource.initialize()
.then(async () => {
    await Movie.clear();

    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    })
    console.log("Connected to DB")
})
.then(()=>{
    insertMoviesData();
})
.catch((err) => {
    console.log(err);
})
