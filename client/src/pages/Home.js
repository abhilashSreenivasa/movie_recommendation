import React,{useEffect,useContext,useState} from 'react'
import jwt from 'jwt-decode'
import {useHistory} from 'react-router-dom'
import NavBarIn from '../components/NavBarIn'
import MainContext from '../context/MainContext'


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
            //setUser(user)
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
        <h1>Movie Recommendation app</h1>
     </div>
     </>
  )
}

export default Home