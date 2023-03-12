import React from 'react'
import { useRef, useState } from 'react';
import { Button } from 'reactstrap'
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
  const nameRef = useRef();
  const classes = useStyles(); 
  const [isLoading, setIsLoading] = useState(false); 

  const registerUser = async (name, email, password) => {
    setIsLoading(true);
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
    }
    setIsLoading(false);
  }

  const submitHandler = (e) => {
    e.preventDefault()
    registerUser(nameRef.current.value, emailRef.current.value, passRef.current.value)
  } 

  return (
    <div className={classes.main}>
        <h1>Register</h1>
        <form onSubmit={submitHandler}>
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
                <Button>Submit</Button>
        </form>
    </div>
  )
}

export default Register