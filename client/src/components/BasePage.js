import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './Login';
import Main from './Main';
import Register from './Register';

const BasePage = () => {

  return (
    <div style={{height: '100%'}}>
        <Routes>    
            <Route path="/" element={<Main/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
        </Routes> 
    </div>
  )
}

export default BasePage