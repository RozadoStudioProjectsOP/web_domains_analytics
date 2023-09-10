import React from 'react'
import { Link, Navigate } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { useContext, useState } from 'react';
import { LoginContext } from '../contexts/login';
import { BASE_URL } from '../utils/base_url';
import DropdownMenu from './DropMenu';
import axios from 'axios';

const useStyles = createUseStyles({
    bar: {
        display: 'flex',
        justifyContent: 'space-between',
        background: '#E9EAEC',
        '& > a': {
          marginLeft: 20,
          color: '#191970',
          fontFamily: 'Gill Sans',
          whiteSpace: 'nowrap',
          letterSpacing: 1,
          '@media (max-width: 700px)': {
            // fontSize: '0.8rem',
            width: '100%',
            textAlign: 'center',
            marginLeft: 0
          },
            '& > h2': {
              '&:hover': {
                textDecoration: 'underline',
                textDecorationThickness: '0.1rem',
                textUnderlineOffset: "2px",
                }
            }
        },
        '& > div': {
          display: 'flex',
          width: '20%',
          justifyContent: 'flex-end',
          marginRight: 10,
          '@media (max-width: 700px)': {
            display: 'none'
          },
            '& > h2': {
                color: '#191970',
                fontFamily: 'Gill Sans',
                whiteSpace: 'nowrap',
                letterSpacing: 1,
                '@media (max-width: 700px)': {
                  fontSize: '1.2rem'
                },
                '&:hover': {
                    textDecoration: 'underline',
                    textDecorationThickness: '0.1rem',
                    textUnderlineOffset: "2px",
                    cursor: 'pointer',
                    color: 'red'
                }
            },
            "& > a": {
                marginRight: 10,
                color: '#191970',
                fontFamily: 'Gill Sans',
                letterSpacing: 1,
                '& > h2': {
                    '&:hover': {
                        textDecoration: 'underline',
                        textDecorationThickness: '0.1rem',
                        textUnderlineOffset: "2px",
                    }
                },
                '&:nth-child(1)': {
                  marginRight: 30,
                }
            }
        }
    },
})

const NavBar = () => {
  const classes = useStyles();  
  const [isHome, setIsHome] = useState(false)
  const { changeLogin, isLoggedIn } = useContext(LoginContext);  
  const logout = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/logout`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      
      if (res.status === 200) {
        changeLogin(false, null)
        sessionStorage.clear();       
        alert("Logout successful");  
        setIsHome(true);
      }
    } catch (error) {
      console.log(error)
    }

  }

  // If isHome is true, go to main page.
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
        {/* <DropdownMenu></DropdownMenu> */}
        <div>
            <h2 onClick={logout} type='button'>Log out</h2>
        </div>
    </div>
  )
}

export default NavBar