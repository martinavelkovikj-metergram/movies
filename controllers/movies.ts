import { error } from "console";
import { Movie } from "../model/Movie";

export const getAllMovies= async( req:any, res: any, next:any)=>{
    try{
        const movies= await Movie.find();
        //console.log(movies);
        res.status(200).json({ movies: movies})

    }catch(err:any){
        //console.log("error")
        err.message='Movies not found';
        res.status(404).json({message: err.message})

    }
}

export const getMovieByImdID= async(req:any, res:any, next:any)=>{
    const imdb= req.params.imdb;
    try{
        const movie= await Movie.findOne({
            where:{
                imdbID:imdb
            }
        });

        res.status(200).json({movie:movie})

    }catch(err: any){
        //console.log("error")
        err.message='Movies not found';
        res.status(404).json({message: err.message})

    }
}

export const deleteMovie= async(req:any, res:any, next:any)=>{
    const id= req.params.id;
    try{
        const movie= await Movie.findOne({
            where:{
                id:id
            }
        }) as Movie;
        //console.log(movie);

        await Movie.remove(movie);
        res.status(200).json({message:"Successfull deletion", movie:movie})

    }catch(err:any){
        //console.log("error")
        err.message='Deletion failed';
        res.status(400).json({message: err.message})

    }
}

export const addMovie= async(req:any, res:any, next:any)=>{
    const { Title, Year, Rated, Released, Runtime, Genre, Director,
            Writer,Actors, Plot, Language, Country, Awards, Poster,
            Metascore, imdbRating, imdbVotes, imdbID, Type, Response,
            Images,ComingSoon } = req.body;

    try{
        const movie= await Movie.create({
            Title:Title,
            Year: Year,
            Rated:  Rated,
            Released: Released,
            Runtime: Runtime,
            Genre:  Genre,
            Director: Director,
            Writer: Writer,
            Actors:Actors,
            Plot: Plot, 
            Language: Language,
            Country: Country,
            Awards: Awards,
            Poster: Poster,
            Metascore: Metascore,
            imdbRating: imdbRating, 
            imdbVotes:imdbVotes, 
            imdbID:imdbID, 
            Type:Type, 
            Response:Response,
            Images:Images,
            ComingSoon: ComingSoon
        });

        await movie.save();
        res.status(200).json({message:'New movie added successfully!',movie: movie});

    }catch(err:any){
          //console.log("error")
          err.message='Adding movie failed';
          res.status(400).json({message: err.message})

    }
}

export const editMovie= async(req:any, res:any, next:any)=>{
    const id= req.params.id;
    const { Title, Year, Rated, Released, Runtime, Genre, Director,
        Writer,Actors, Plot, Language, Country, Awards, Poster,
        Metascore, imdbRating, imdbVotes, imdbID, Type, Response,
        Images,ComingSoon } = req.body;

    try{

        const movie= await Movie.findOne({
            where:{
                id:id
            }
        }) as Movie;

         movie.Title=Title;
         movie.Year= Year;
         movie.Rated=  Rated;
         movie.Released= Released;
         movie.Runtime= Runtime;
         movie.Genre= Genre;
         movie.Director= Director;
         movie.Writer= Writer;
         movie.Actors=Actors;
         movie.Plot= Plot;
         movie.Language= Language;
         movie.Country= Country;
         movie.Awards= Awards;
         movie.Poster= Poster;
         movie.Metascore= Metascore;
         movie.imdbRating= imdbRating; 
         movie.imdbVotes=imdbVotes; 
         movie.imdbID=imdbID;
         movie.Type=Type; 
         movie.Response=Response;
         movie.Images=Images;
         movie.ComingSoon= ComingSoon;
         await movie.save();
         res.status(201).json({message:'New movie edited successfully!',movie: movie});


    }catch(err:any){

        err.message='Editing movie failed';
          res.status(400).json({message: err.message})

    }
}