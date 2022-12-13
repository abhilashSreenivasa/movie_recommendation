import { createContext,useState } from "react";
const MainContext= createContext();

export const MainContextProvider=({children})=>{
    const [userState,setUserState]=useState({})
    const [favourites,setFavourites]=useState([])
    const [watchLater,setWatchLater]=useState([])
    return <MainContext.Provider value={
        {
            userState,
            setUserState,
            favourites,
            setFavourites,
            watchLater,
            setWatchLater

        }
    }>
        {children}
    </MainContext.Provider>
}
export default MainContext