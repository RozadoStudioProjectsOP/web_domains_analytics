import React from 'react'
import { Button } from 'reactstrap'
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";

const useStyles = createUseStyles({
    main: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    buttons: {
        "& > a": {
            margin: 10,
        }
    }
  })

const Main = () => {
    const classes = useStyles();

  return (
    <div className={classes.main}>
        <h1>Web Domain Analytics</h1>
        <div className={classes.buttons}>
            <Link to="/login" style={{ textDecoration: 'none' }}><Button>Login</Button></Link>
            <Link to="/register" style={{ textDecoration: 'none' }}><Button>Register</Button></Link>
        </div>
    </div>
  )
}

export default Main