//R

import React, {createContext, useState, useEffect, ReactNode} from "react";

import API from "../services/api";


//Create an interface and mirror for the the user, A type of user
interface User { 
    id: string;
    name: string;
    email: string
}


interface AuthContextType {
    user : User | null
    login : (email: string, password: string) => Promise<void>;
    register : (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);


export const AuthProvider : React.FC<{children: ReactNode}> = ({children}) =>{
    const [user, setUser] = useState<User | null>(null);

    useEffect(() =>{
        const storedUser = localStorage.getItem("user");
        if(storedUser) setUser(JSON.parse(storedUser));
    }, []);

    const login = async (email: string, password: string) =>{
        const res = await API.post("/auth/login" , { email, password });
        setUser(res.data.user);
        localStorage.setItem("user" , JSON.stringify(res.data.user));
        localStorage.setItem("token" , res.data.token);
    }

    const register = async (name: string, email: string, password: string) =>{
        const res = await API.post("/auth/register" , {name, email, password});
        setUser(res.data.user);
        localStorage.setItem("user" , JSON.stringify(res.data.user));
        localStorage.setItem("token" , res.data.token);

    }

    const logout = () =>{
        setUser(null);
        localStorage.clear();
    }


    return(
        <AuthContext.Provider  value={{user, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    )
}
