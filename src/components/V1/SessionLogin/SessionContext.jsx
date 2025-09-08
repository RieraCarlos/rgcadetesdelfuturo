import React, { createContext, useEffect, useState } from "react";

export const SessionContext = createContext();

export const SessionProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const sessionExpiration = localStorage.getItem("sessionExpiration");
        if(storedUser && sessionExpiration && Date.now() <sessionExpiration){
            setUser(storedUser);
            setIsAuthenticated(true);
        }else{
            logout();
        }
    },[]);

    const login = (userData) => {
        const expirationTime = Date.now() + 3600000;
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("sessionExpiration", expirationTime);
        setUser(userData);
        setIsAuthenticated(true);
    };
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user");
    };
    return (
        <SessionContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </SessionContext.Provider>
    )
}