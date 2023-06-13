import React from 'react'
import { useRef, useState, useContext } from 'react';
import { createUseStyles } from "react-jss";
import { BASE_URL } from '../utils/base_url';
import { LoginContext } from '../contexts/login';
import { Navigate } from 'react-router-dom'
import NavBar from './NavBar';
import { SocialLogins } from './OAuth/Loginfunc.js';
import { ProgressBar } from 'react-loader-spinner';

import axios from 'axios'

const useStyles = createUseStyles({
    main: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '90vh',
        backgroundColor: '#E9EAEC',
        '& > form': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            border: "2px solid #385E72",
            padding: 40,
            paddingBottom: 0,
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

const Register = (props) => {
  const emailRef = useRef();
  const passRef = useRef();
  const nameRef = useRef();
  const repPassRef = useRef();
  const classes = useStyles(); 
  const [isLoading, setIsLoading] = useState(false); 
  const [isHome, setIsHome] = useState(false)
  const { changeLogin } = useContext(LoginContext);

  const registerUser = async (name, email, password, repPass) => {
    setIsLoading(true);

    if (password !== repPass){
        window.alert("Error. Password field and Repeat password field must coincide")
        setIsLoading(false)
        return
    }

    try {
        const res = await axios.post(`${BASE_URL}/auth/register`, {
            username: name,
            email: email,
            password: password,
        })
        if (res.status === 201){
            console.log(`Register successful. Email: ${email}`)
            window.alert("Register Successful")
            changeLogin(true)
            setIsHome(true)
        }else{
            console.log("Error")
        }
    } catch (error) {
        console.error(error.response.data.msg)
        const errorMessage = error.response.data.msg;
        if (errorMessage.includes("E11000")) {
            window.alert("Sorry, a user with the same e-mail already exists")
        }
        if (errorMessage.includes("users validation failed: password")) {
            window.alert("Error. Password must be at least 8 characters")
        }
    }
    setIsLoading(false);
  }

  const submitHandler = (e) => {
    e.preventDefault()
    registerUser(nameRef.current.value, emailRef.current.value, passRef.current.value, repPassRef.current.value)
  } 

  if (isHome === true) {
    return <Navigate to="/" />
  }

  return (
    <>
    <NavBar></NavBar>
    <div className={classes.main}>
        <form onSubmit={submitHandler}>
            <h1>REGISTER</h1>
            <div>
                <input
                    type='ame'
                    placeholder='Name' 
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
                <input
                    type='password'
                    placeholder='Repeat password' 
                    ref={repPassRef}
                    required
                />
                {isLoading ? (
                    <p>
                        Loading...
                    </p>
                ) : null}
            </div>    
            {isLoading ? (
                    <ProgressBar type="Circles" color="#00BFFF" height={80} width={80}/>
                ) : (
                    <input type="submit" value="Submit"></input>
                )}
            <SocialLogins />
        </form>
    </div>
    </>
  )
}

export default Register