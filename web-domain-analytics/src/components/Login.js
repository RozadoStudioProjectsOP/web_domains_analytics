import React from 'react'
import { useRef } from 'react';
import { Button } from 'reactstrap'
import { createUseStyles } from "react-jss";
import axios from 'axios';
import { BASE_URL } from '../utils/base_url';
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

const Login = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const nameRef = useRef();
  const classes = useStyles();  

  const loginUser = async (name, email, password) => {
    console.log(name, email, password)
    try {
        const res = await axios.post(`${BASE_URL}/auth/login`, {
            username: name,
            email: email,
            password: password,
        })
        if (res.status === 201){
            console.log(`Login successful. Email: ${email}`)
        }else{
            console.log("Error")
        }
    } catch (error) {
        console.error(error.response.data)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    loginUser(nameRef.current.value, emailRef.current.value, passRef.current.value)
  }

  return (
    <div className={classes.main}>
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
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
            </div>    
                <Button>Submit</Button>
        </form>
    </div>
  )
}

export default Login