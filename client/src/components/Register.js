import React from 'react'
import { useRef, useState } from 'react';
import { createUseStyles } from "react-jss";
import { BASE_URL } from '../utils/base_url';
import axios from 'axios'

const useStyles = createUseStyles({
    main: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#E9EAEC',
        '& > form': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            border: "2px solid #a6a6a6",
            padding: 40,
            borderRadius: 5,
            width: '20vw',
            background: 'white',
            '& > h1': {
                fontFamily: 'Gill Sans',
                fontSize: '2rem',
                letterSpacing: '0.3rem'
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
                boxShadow: "4px 4px 5px 1px rgba(0, 0, 0, 0.50)",
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

const Register = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const nameRef = useRef();
  const repPassRef = useRef();
  const classes = useStyles(); 
  const [isLoading, setIsLoading] = useState(false); 

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

  return (
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
            <input type="submit" value="Submit"></input>
        </form>
    </div>
  )
}

export default Register