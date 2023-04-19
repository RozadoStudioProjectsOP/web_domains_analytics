import React from 'react'
import { useRef, useState, useContext } from 'react';
import { createUseStyles } from "react-jss";
import axios from 'axios';
import { BASE_URL } from '../utils/base_url';
import { Navigate } from 'react-router-dom'
import { LoginContext } from '../contexts/login';
import NavBar from './NavBar';
import { SocialLogins } from './OAuth/Loginfunc.js';

const useStyles = createUseStyles({
    main: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '90%',
        backgroundColor: '#E9EAEC',
        '& > form': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            border: "2px solid #385E72",
            padding: 40,
            borderRadius: 5,
            width: '20vw',
            background: 'white',
            '& > h1': {
                fontFamily: 'Gill Sans',
                fontSize: '2rem',
                letterSpacing: '0.3rem',
                color: '#191970'
            },
            '& > div': {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 20,
                width: '80%',
                "& > input": {
                    margin: 10,
                    padding: 15,
                    width: "100%"
                }
            },
            '& > input': {
                width: '100%',
                padding: '12px 20px',
                border: 'none',
                borderRadius: 5,
                cursor: 'pointer',
                background: '#D9E4EC',
                fontWeight: 'bold',
                boxShadow: "4px 4px 5px 1px rgba(0, 0, 0, 0.25)",
                transition: "transform 50ms",
                '&:hover': {
                    background: '#385E72',
                    color: 'white'
                },
                "&:active": {
                    transform: "translateY(4px)",
                    boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0.75)",
                }
            }
        }
    },
  })

const Login = (props) => {
  const emailRef = useRef();
  const passRef = useRef();
  const nameRef = useRef();
  const classes = useStyles();  
  const [isLoading, setIsLoading] = useState(false); 
  const [isHome, setIsHome] = useState(false)
  const { changeLogin } = useContext(LoginContext);

  const loginUser = async (name, email, password) => {
    console.log(name, email, password)
    setIsLoading(true);
    try {
        const res = await axios.post(`${BASE_URL}/auth/login`, {
            username: name,
            email: email,
            password: password,
        })
        if (res.status === 201){
            changeLogin(true)
            setIsHome(true)
            console.log(`Login successful. Email: ${email}`)
            window.alert("Login Successful")
        }else{
            console.log("Error")
        }
    } catch (error) {
        console.error(error.response.data)
    }
    setIsLoading(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    loginUser(nameRef.current.value, emailRef.current.value, passRef.current.value)
  }

  if (isHome === true) {
    return <Navigate to="/" />
  }

  return (
    <>
    <NavBar></NavBar>
    <div className={classes.main}>
        <form onSubmit={handleSubmit}>
            <h1>LOGIN</h1>
            <div>
                <input
                    type='name'
                    placeholder='name' 
                    ref={nameRef}
                    required
                />
                <input
                    type='email'
                    placeholder='E-mail' 
                    ref={emailRef}
                    required
                    />
                <input
                    type='password'
                    placeholder='Password' 
                    ref={passRef}
                    required
                    />
                {isLoading ? (
                    <p>
                        Loading...
                    </p>
                ) : null}
            </div>    
            <input type="submit" value="Submit"></input>
            <SocialLogins />
        </form>
    </div>
    </>
  )
}

export default Login