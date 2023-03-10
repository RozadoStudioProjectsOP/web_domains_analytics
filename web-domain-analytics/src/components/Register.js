import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { Alert, Button, Form, FormGroup, Input } from 'reactstrap'
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
        '& > form': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            border: "2px solid black",
            padding: 20,
            borderRadius: 5,
            '& > div': {
                display: 'flex',
                flexDirection: 'column',
                margin: 20,
                "& > input": {
                    margin: 10
                }
            }
        }
    },
  })

const Register = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const classes = useStyles();  

  const registerUser = async (email, password) => {
    try {
        const res = await axios.post(`http://localhost:3000/auth/register`, {
            username: "name",
            email: email,
            password: password
        })
        if (res.status === 201){
            console.log(`Register successful. Email: ${email}`)
        }else{
            console.log("Error")
        }
    } catch (error) {
        console.log(error)
      }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    registerUser(emailRef.current.value, passRef.current.value)
  } 

  return (
    <div className={classes.main}>
        <h1>Register</h1>
        <form onSubmit={submitHandler}>
            <div>
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
                <Button>Submit</Button>
        </form>
    </div>
  )
}

export default Register