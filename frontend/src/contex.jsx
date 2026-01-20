import React, { createContext, useState } from "react";

export const AuthContext = createContext();


export const AuthProvider = ({children})=>{
    const [context_categories, setcontext_categories] = useState([]);
    // const[napi, setnapi] = useState(null);
    return(

        <AuthContext.Provider value={{ context_categories, setcontext_categories }}>
            {children}
            </AuthContext.Provider>
        );
    };