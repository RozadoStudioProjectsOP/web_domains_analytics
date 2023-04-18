import { createContext, useState } from "react";

const LoginContext = createContext();

// Provides components with login state
const LoginProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const changeLogin = (state) => {
        setIsLoggedIn(state)
    }

    return (
        <LoginContext.Provider value={{ isLoggedIn, changeLogin }}>
            {props.children}
        </LoginContext.Provider>
    )  
}

export { LoginContext, LoginProvider }