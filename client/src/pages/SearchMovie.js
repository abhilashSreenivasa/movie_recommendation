import { useEffect,useState } from "react"
import axios from 'axios'
import NavBarIn from "../components/NavBarIn";
import { APIKEY } from "../requests";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {baseURL} from "../components/Row"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


function SearchMovie() {
    const [movies, setMovies]=useState([])
    const [query, setQuery]=useState("")
    const [open, setOpen] = useState(false);
    const [title, setTitle]=useState("")
    const [desc, setDesc]=useState("")
    const [date, setDate]=useState("")
    const [rating, setRating]=useState(0)


  const handleClickOpen = (movie) => {
    setTitle(movie.title)
    setDesc(movie.overview)
    setDate(movie.release_date)
    setRating(movie.vote_average)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    async function getMovies(e){
        const str=e.target.value;
        if(str){
            const obj=await axios.get( `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&page=1&query=${str}`)
        
        if(obj){
            console.log(obj)
            const movies=obj.data.results;
            setMovies(movies);
        }
     }
        else{
            setMovies([])
        }

     }
    
   // console.log(movies)
  return (
    <>
        <NavBarIn/>
        <div className="search-bar">
          <Box
          
            sx={{
            width: 500,
            maxWidth: '100%',
            }}>
          <TextField fullWidth label="fullWidth" id="fullWidth" onChange={(e)=>getMovies(e)} />
          </Box>
      </div>
          {movies && <div className="search-results">
            {movies.map( (movie)=>
            <img width={150} height={200} src={baseURL+movie.poster_path} onClick={()=>handleClickOpen(movie)} />
             )}
          </div>}
          <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
        <div className='card-movie-info'>
          <div className="movie-title">{title}</div>
          <div className="movie-desc">{desc}</div>
          <div className='movie-date'><span className='movie-text'>Release Date:</span> {date}</div>
          <div className='movie-rating'><span className='movie-text'>Ratings:</span> {rating}</div>
        </div>      
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
    
        </DialogActions>
      </Dialog>  
    </>

  )

  }
export default SearchMovie;