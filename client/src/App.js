import React from 'react'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import about from './pages/about'
import Suggestion from './pages/Suggestion'
import SearchMovie from './pages/SearchMovie'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { MainContextProvider } from './context/MainContext'
import { ThemeProvider,createTheme } from "@mui/material";
import { ConfirmProvider } from "material-ui-confirm";


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <BrowserRouter>

<ThemeProvider theme={darkTheme}>
  <ConfirmProvider>
 
    <div>
         <Route path="/login" exact component={Login}/>
         <Route path="/register" exact component={Register}/>
         <MainContextProvider>
           <Route path="/home" exact component={Home}/>
           <Route path="/suggestion" exact component={Suggestion}/>
           <Route path="/search" exact component={SearchMovie}/>
           <Route path="/about" exact component={about}/>
         <Redirect from="*" to="/login" />

    




         </MainContextProvider>  
    </div>
    </ConfirmProvider>
    </ThemeProvider>
    </BrowserRouter>
  )
}

export default App