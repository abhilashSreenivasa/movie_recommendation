import {useState,useContext, useEffect} from 'react'
import MainContext from '../context/MainContext'
import NavBarIn from '../components/NavBarIn';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import axios from 'axios';


function Favourites() {
    const {favourites,userState,setFavourites}=useContext(MainContext)
    const [mid, setMid]=useState("");
    const [open, setOpen] = useState(false);
    const [title, setTitle]=useState("")
    const [desc, setDesc]=useState("")
    const [date, setDate]=useState("")
    const [rating, setRating]=useState(0)

    useEffect(()=>{
        async function getFavs(){
            const obj=await axios.get( `http://35.91.221.117:1337/api/data/${userState.name}`)
            if(obj){
                console.log(obj.data)
                const favs=obj.data.userInfo[0].favourites;
                setFavourites(()=>favs);
            }
        }
        getFavs()
    
    
    },[])

  const handleDelete=()=>{
    const token = localStorage.getItem('token')  

        fetch(`http://35.91.221.117:1337/api/delete/${userState.name}/${mid}`,{
         method: 'POST',
         headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
        },
      }
     ).then((response)=>{
        return response.json()
     }
     ).then((data)=>{
    //console.log(data)
    if(data.favourites)
      setFavourites((prev)=>data.favourites) 

    }).catch((err)=>{
        console.log(err)
    })
    setOpen(false)

  }

  const handleClickOpen = (movie) => {
    setMid(movie.mid)
    setTitle(movie.title)
    setDesc(movie.desc)
    setDate(movie.date)
    setRating(movie.rating)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <>
     <NavBarIn/>

     {favourites && <div className="search-results">
            {favourites.map( (movie)=>
             <img className='movie-posters' key={movie.mid} width={150} height={200} src={movie.imageURL} onClick={()=>handleClickOpen(movie)} />
             )}
          </div>}
          <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Favourites</DialogTitle>
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
          <Button onClick={()=>handleDelete()}>Delete</Button>
        </DialogActions>
      </Dialog>  
    </>
  )
}

export default Favourites