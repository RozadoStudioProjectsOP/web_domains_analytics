import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../utils/base_url.js";

const LoginContext = createContext();

// Provides components with login state
const LoginProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        sessionStorage.getItem('isLoggedIn') === 'true' || false
    );
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(sessionStorage.getItem('currentUser')) || null
    )

    useEffect(() => {
        axios.get(`${BASE_URL}/auth/user`, { withCredentials: true }).then((res) => {
            if (res.data && sessionStorage.getItem('isLoggedIn') === 'true') {
                setCurrentUser(res.data)
            }
        })
    }, [])
    
    const changeLogin = (status, user) => {
        setIsLoggedIn(status);
        setCurrentUser(user);
    }

    return (
        <LoginContext.Provider value={{ isLoggedIn, currentUser, changeLogin }}>
            {props.children}
        </LoginContext.Provider>
    )  
}

export { LoginContext, LoginProvider }