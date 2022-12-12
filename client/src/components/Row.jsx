import {useState,useEffect} from 'react';
import axios from 'axios';
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'

const baseURL="https://image.tmdb.org/t/p/original";

function Row({title,fetchUrl}){
    const [movies,setMovies]=useState([]);
    const [trailerUrl,setTrailerUrl]=useState("")
    const [currentMovie,setCurrentMovie]=useState({})
    useEffect(()=>{
        async function fetchMovies(){
            if(fetchUrl){
                const request= await axios.get(fetchUrl)
                setMovies(request.data.results)
                return request;
            }
        }
        fetchMovies();
    },[fetchUrl])
    const opts={
        width:"100%",
        height:"500",
        playerVars:{
            autoplay:1
        }

    }
    const handleClick=(movie)=>{
       
        if(trailerUrl && currentMovie.id==movie.id ){
            setTrailerUrl("");   
        }
        else{

            movieTrailer(null, {tmdbId:movie.id})
            .then((url)=>{
                const urlParams= new URLSearchParams(new URL(url).search);
                 setTrailerUrl(urlParams.get("v"));
                 setCurrentMovie(movie)
            }).catch((e)=>alert('No trailer available for this video at the moment'))
        }
    }
    return(
        <div className='row'>
            <h3>{title}</h3>
            <div className='card'>
           
            {movies.map(movie=>(
                <img
                onClick={()=>handleClick(movie)} 
                key={movie.id}
                className='card-poster'
                 src={`${baseURL}${movie.poster_path}`}
                  alt={movie.name}/>
    
            ))}
            
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}
export default Row;