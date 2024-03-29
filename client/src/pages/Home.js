import React,{useEffect,useContext,useState} from 'react'
import jwt from 'jwt-decode'
import {useHistory} from 'react-router-dom'
import NavBarIn from '../components/NavBarIn'
import MainContext from '../context/MainContext'
import Row from '../components/Row'
import requests from '../requests'


function Home() {
    const history=useHistory()	
    const {setUserState}=useContext(MainContext)
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






  return (
    <>
    <NavBarIn/>
    
    <div className="trending-items">
        <Row title="Trending Now" fetchUrl={requests.trending}/>
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