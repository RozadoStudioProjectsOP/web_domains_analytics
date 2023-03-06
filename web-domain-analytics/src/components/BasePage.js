import React from 'react'
import { createUseStyles } from "react-jss";
import { Routes, Route } from "react-router-dom";
import Login from './Login';
import Main from './Main';
import Register from './Register';

const useStyles = createUseStyles({

  })

const BasePage = () => {
    const classes = useStyles();

  return (
    <div>
        <Routes>    
            <Route path="/" element={<Main />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes> 
    </div>
  )
}

export default BasePage