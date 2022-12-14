import { useEffect, useState } from 'react'
import NavBarIn from '../components/NavBarIn'
import {APIKEY} from '../requests'
import axios from 'axios'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FiRefreshCcw } from "react-icons/fi";
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'
import { opts } from '../components/Row';


var rand = require('random-seed').create();
const baseURL="https://image.tmdb.org/t/p/original";

function Suggestion() {

    const [genres, setGenres]=useState([])
    const [genre,setGenre]=useState("")
    const [movie,setMovie]=useState({})
    const [trailerUrl,setTrailerUrl]=useState("")



 useEffect( ()=>{
    setGenre(28+"");
    async function getMovie(){
        const pageNo=rand(3)+1;
        const obj=await axios.get( `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&with_genres=28&page=${pageNo}`)

        if(obj){
            const movies=obj.data.results;
            
            setMovie(movies[Math.floor(rand(movies.length))]);
   
            
        }
    }
    getMovie()
    async function getGenre(){
        const obj=await axios.get( `https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKEY}&language=en-US`)

        if(obj){
            setGenres(obj.data.genres);
        }
    }
    getGenre()
    //console.log(genres)

 },[])



 const handleChange = async (event) => {
    
    setGenre(event.target.value+"");
    const gid=event.target.value;
    async function getMovie(){
        const pageNo=rand(3)+1;
        const obj=await axios.get( `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&with_genres=${gid}&page=${pageNo}`)

        if(obj){
            setTrailerUrl("")
            const movies=obj.data.results;
            setMovie(movies[Math.floor(rand(movies.length))]);
       
            
        }
    }
    getMovie()
    
    //console.log(movie)
  };
  const handleClick=(m)=>{
       
    if(trailerUrl && movie.id==m.id ){
        setTrailerUrl("");   
    }
    else{

        movieTrailer(null, {tmdbId:m.id})
        .then((url)=>{
            const urlParams= new URLSearchParams(new URL(url).search);
             setTrailerUrl(urlParams.get("v"));
            // setCurrentMovie(movie)
        }).catch((e)=>alert('No trailer available for this video at the moment'))
    }
}

const reloadMovie=async()=>{
    async function getMovie(){
        const pageNo=rand(3)+1;
        const obj=await axios.get( `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&with_genres=${genre}&page=${pageNo}`)

        if(obj){
            setTrailerUrl("")
            const movies=obj.data.results;
            
            setMovie(movies[Math.floor(rand(movies.length))]);
            
            
        }
    }
    getMovie()
    
}


  return (
    <>
        <NavBarIn/>
        <div className='movie-select-input'>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Genre</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={genre}
          onChange={handleChange}
          autoWidth
          label="Genre"
        >
         
          {genres.map((obj)=>(
            <MenuItem key={obj.id} value={obj.id}>{obj.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
    <div className='card-large-container'>
     {movie && <div className='card-large'>
        <img 
                onClick={()=>handleClick(movie)} 
                className='card-poster-large'
                 src={`${baseURL}${movie.poster_path}`}
                  alt={movie.name}/>
        <div className='card-movie-info'>
        {movie &&<div className="movie-title">{movie.title}</div>}
        {movie &&<div className="movie-desc">{movie.overview}</div>}
        {movie &&<div className='movie-date'><span className='movie-text'>Release Date:</span> {movie.release_date}</div>}
        {movie &&<div className='movie-rating'><span className='movie-text'>Ratings:</span> {movie.vote_average}</div>}
        {movie && <FiRefreshCcw className='movie-reload-btn' size={30} onClick={()=>{
            reloadMovie();
        }}/>

        }
        </div>
        
     </div>}
     {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
     </div>
    </>
    
  )
}

export default Suggestion