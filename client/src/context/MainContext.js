import { createContext,useState } from "react";
const MainContext= createContext();

export const MainContextProvider=({children})=>{
    const [userState,setUserState]=useState({})

    return <MainContext.Provider value={
        {
            userState,
            setUserState,       
          
        }
    }>
        {children}
    </MainContext.Provider>
}
export default MainContext