import React,{useEffect,useContext,useState} from 'react'
import jwt from 'jwt-decode'
import {useHistory} from 'react-router-dom'
import NavBarIn from '../components/NavBarIn'
import MainContext from '../context/MainContext'
import Row from '../components/Row'
import requests from '../requests'



  


function Home() {
    const history=useHistory()	
    const {userState,setUserState}=useContext(MainContext)
    

useEffect( ()=>{
    const token=localStorage.getItem('token')
    if(token){
        const user=jwt(token)
        if(!user){
            localStorage.removeItem('token')
            history.replace('/login')
        }
        else{
            setUserState(user)
           
        }
    }
    else{
        history.push('/login')
    }

},[]);

useEffect(()=>{
})


  return (
    <>
    <NavBarIn/>
    
    <div>
        <Row title="Trending Now" fetchUrl={requests.trending}/>
        <Row title="Netflix Originals" fetchUrl={requests.netflixOriginals}/>
        <Row title="Action Movies" fetchUrl={requests.actionMovies}/>
        <Row title="Comedy Movies" fetchUrl={requests.comedyMovies}/>
        <Row title="Horror Movies" fetchUrl={requests.horrorMovies}/>
        <Row title="Top Rated Movies" fetchUrl={requests.topRated}/>
        <Row title="Documentaries" fetchUrl={requests.docuMovies}/>
        <Row title="Romantic Movies" fetchUrl={requests.romanticMovies}/>
    
     </div>
     
     </>
  )
}

export default Home