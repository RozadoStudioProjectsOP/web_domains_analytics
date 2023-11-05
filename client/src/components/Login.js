import React from 'react'
import { useRef, useState, useContext, useEffect } from 'react';
import { createUseStyles } from "react-jss";
import axios from 'axios';
import { BASE_URL } from '../utils/base_url';
import { Navigate, redirect } from 'react-router-dom'
import { LoginContext } from '../contexts/login';
import NavBar from './NavBar';
import { SocialLogins } from './OAuth/Loginfunc.js';
import { ProgressBar } from 'react-loader-spinner';
import background from '../media/andyone--WW8jBak7bo-unsplash.jpg'

const useStyles = createUseStyles({
    main: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '93vh',
        backgroundColor: '#E9EAEC',
        backgroundImage: 'url(' + background + ')',
        backgroundSize: 'cover',
        '& > form': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            boxShadow: '15px 15px 5px rgba(0, 0, 0, 0.5)',
            padding: 40,
            borderRadius: 5,
            width: '20vw',
            background: 'rgb(255,255,255,1)',
            maxHeight: '70vh',
            '@media (max-width: 1100px)': {
                width: '60%'
              },
            '& > h1': {
                fontFamily: 'Gill Sans',
                fontSize: '2rem',
                letterSpacing: '0.3rem',
                color: '#191970'
            },
            '& > div[class^="login"]': {
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
  const [isHome, setIsHome] = useState(false);
  const { changeLogin } = useContext(LoginContext);

  useEffect(() => {
    if(!sessionStorage.getItem("token")){
      changeLogin(false, null);
      sessionStorage.setItem("isLoggedIn", false);
    }
  }, [changeLogin]);

  const loginUser = async (name, email, password) => {
    setIsLoading(true);
    try {
        //Fetch backend login route
        const res = await axios.post(`${BASE_URL}/auth/login`, {
            username: name,
            email: email,
            password: password,
        })
        if (res.status === 201){
            changeLogin(true, res.data.data)
            sessionStorage.setItem("token", res.data.token)
            sessionStorage.setItem("currentUser", JSON.stringify(res.data.data))
            sessionStorage.setItem("isLoggedIn", true)
            setIsHome(true)
            console.log(`Login successful. Email: ${email}`)
            //window.alert("Login Successful")
            redirect("/");
        }else{
            console.log("Error")
        }
    } catch (error) {
        console.error(error.response.data)
        alert(error)
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
    <div>
    <NavBar></NavBar>
    <div className={classes.main}>
        <form onSubmit={handleSubmit}>
            <h1>LOGIN</h1>
            <div className='login'>
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
            </div>    
            {isLoading ? (
                    <ProgressBar type="Circles" color="#00BFFF" height={80} width={80}/>
                ) : (
                    <input type="submit" value="Submit"></input>
                )}
            <SocialLogins />
        </form>
    </div>
    </div>
  )
}

export default Login