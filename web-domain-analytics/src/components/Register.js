import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { Alert, Button, Form, FormGroup, Input } from 'reactstrap'

const Register = () => {
  const dataRef = useRef()

  const handleSubmit = () => {

  } 

  return (
    <div>
        <h1>Register</h1>
        <Form onSubmit={handleSubmit}>
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

export default Register