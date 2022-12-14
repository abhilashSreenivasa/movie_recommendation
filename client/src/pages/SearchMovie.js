import { useEffect,useState,useContext } from "react"
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
import MainContext from '../context/MainContext'



function SearchMovie() {
  const {userState,favourites,setFavourites}=useContext(MainContext)
    const [movies, setMovies]=useState([])
    const [isDisable, setIsDisable]=useState(false)
    const [query, setQuery]=useState("")
    const [open, setOpen] = useState(false);
    const [title, setTitle]=useState("")
    const [desc, setDesc]=useState("")
    const [date, setDate]=useState("")
    const [rating, setRating]=useState(0)
    const [imageURL,setImageURL]=useState("")
    const [mid, setMid]=useState("")

  const handleClickOpen = (movie) => {
    
    setTitle(movie.title)
    setDesc(movie.overview)
    setDate(movie.release_date)
    setRating(movie.vote_average)
    setImageURL(baseURL+movie.poster_path)
    setMid(movie.id)
    setOpen(true);
    if(favourites.filter(e=>e.title==movie.title).length>0)
      setIsDisable(true);
  };

  const addFav=async (id)=>{
    const token = localStorage.getItem('token')  

    const response = await fetch(`http://localhost:1337/api/add/${userState.name}/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        mid,
        title,
        desc,
        date,
        rating,
        imageURL

      }),
    })
    async function getFavs(){
      const obj=await axios.get( `http://localhost:1337/api/data/${userState.name}`)
      if(obj){
          console.log(obj.data)
          const favs=obj.data.userInfo[0].favourites;
          setFavourites(()=>favs);
      }
  }
    getFavs()
    setIsDisable(true)
  }

  const handleClose = () => {
    setIsDisable(false)
    setOpen(false);
  };

    async function getMovies(e){
        const str=e.target.value;
        if(str){
            const obj=await axios.get( `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&page=1&query=${str}`)
        
        if(obj){
            const movies=obj.data.results;
            setMovies(movies.filter((movie)=>movie.poster_path.length>0));
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
          <TextField fullWidth label="search" id="fullWidth" onChange={(e)=>getMovies(e)} />
          </Box>
      </div>
          {movies && <div className="search-results">
            {movies.map( (movie)=>
             <img className="movie-posters" key={movie.id} alt={movie.title} width={150} height={200} src={baseURL+movie.poster_path} onClick={()=>handleClickOpen(movie)} />
             )}
          </div>}
          <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Is this what you are looking for?</DialogTitle>
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
          <Button disabled={isDisable} onClick={()=>addFav(1)}>Favourite</Button>

        </DialogActions>
      </Dialog>
    
    </>

  )

  }
export default SearchMovie;