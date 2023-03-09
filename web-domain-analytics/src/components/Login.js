import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { Alert, Button, Form, FormGroup, Input } from 'reactstrap'
import { createUseStyles } from "react-jss";

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
  const dataRef = useRef()
  const classes = useStyles();  
  const handleSubmit = () => {

  }

  return (
    <div className={classes.main}>
        <Form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <FormGroup>
                <Input
                    type='email'
                    placeholder='E-mail' 
                    ref={dataRef}
                    required
                />
                <Input
                    type='password'
                    placeholder='Password' 
                    ref={dataRef}
                    required
                />
            </FormGroup>    
                <Button>Submit</Button>
        </Form>
    </div>
  )
}

export default Login