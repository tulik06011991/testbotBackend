import React, {useState} from "react";


import UserContext from "./userContext";

const UserContextProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [natija , setNatija] = useState(null)
    const [id, setId] = useState(null)

    return (
        <UserContext.Provider value={{user, setUser, natija, setNatija, id, setId}}>

            {children}
        </UserContext.Provider>
    )

}

export default UserContextProvider