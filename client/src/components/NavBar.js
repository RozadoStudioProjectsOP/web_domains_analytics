import React from 'react'
import { Link, Navigate } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { useContext, useState } from 'react';
import { LoginContext } from '../contexts/login';
import { BASE_URL } from '../utils/base_url';
import axios from 'axios';

const useStyles = createUseStyles({
    bar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '10%',
        background: '#E9EAEC',
        '& > a': {
            marginLeft: 15,
            color: '#191970',
            fontFamily: 'Gill Sans',
            letterSpacing: 1,
            '& > h2': {
                '&:hover': {
                    textDecoration: 'underline',
                    textDecorationThickness: '0.1rem',
                    textUnderlineOffset: "2px"
                }
            }
        },
        '& > div': {
            width: "20%",
            display: 'flex',
            justifyContent: 'space-around',
            marginRight: 15,
            '& > h2': {
                color: '#191970',
                fontFamily: 'Gill Sans',
                letterSpacing: 1,
                '&:hover': {
                    textDecoration: 'underline',
                    textDecorationThickness: '0.1rem',
                    textUnderlineOffset: "2px",
                    cursor: 'pointer',
                }
            },
            "& > a": {
                color: '#191970',
                fontFamily: 'Gill Sans',
                letterSpacing: 1,
                '& > h2': {
                    '&:hover': {
                        textDecoration: 'underline',
                        textDecorationThickness: '0.1rem',
                        textUnderlineOffset: "2px"
                    }
                }
            }
        }
    }
})

const NavBar = () => {
  const classes = useStyles();  
  const [isHome, setIsHome] = useState(false)
  const { changeLogin } = useContext(LoginContext);
  const { isLoggedIn } = useContext(LoginContext);

  const logout = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/logout`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      
      if (res.status === 200) {
        changeLogin(false)
        sessionStorage.clear();       
        alert("Logout successful");  
        setIsHome(true);
      }
    } catch (error) {
      console.log(error)
    }

  }

  if (isHome === true) {
    return <Navigate to="/" />
  }

  return !isLoggedIn ? (
    <div className={classes.bar}>
        <Link to="/" style={{ textDecoration: 'none' }}><h2>Web Domains Analytics</h2></Link>
        <div>
            <Link to="/login" style={{ textDecoration: 'none' }}><h2>Login</h2></Link>
            <Link to="/register" style={{ textDecoration: 'none' }}><h2>Register</h2></Link>
        </div>
    </div>
  ) : (
    <div className={classes.bar}>
        <Link to="/" style={{ textDecoration: 'none' }}><h2>Web Domains Analytics</h2></Link>
        <div>
            <h2 onClick={logout} type='button'>Log out</h2>
        </div>
    </div>
  )
}

export default NavBar