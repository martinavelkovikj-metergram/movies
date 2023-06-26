import { AppSource } from "./util/database"
import express from "express";
import { insertMoviesData } from "./insertMoviesToDB";

const app = express();
app.use(express.json());

AppSource.initialize()
.then(() => {
    
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
