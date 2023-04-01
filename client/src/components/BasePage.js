import React from 'react'
//import { createUseStyles } from "react-jss";
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Login from './Login';
import Main from './Main';
import Register from './Register';

// const useStyles = createUseStyles({

//   })

const BasePage = () => {
    //const classes = useStyles();
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const login = (d) => {
      setIsLoggedIn(d);
    }

  return (
    <div>
        <Routes>    
            <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />
            <Route path="/register" element={<Register login={login} />} />
            <Route path="/login" element={<Login login={login} />} />
        </Routes> 
    </div>
  )
}

export default BasePage