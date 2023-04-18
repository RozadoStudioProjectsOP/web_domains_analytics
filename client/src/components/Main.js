import React from 'react'
import { Button } from 'reactstrap'
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { LoginContext } from '../contexts/login';
import Landing from './Landing';
import NavBar from './NavBar';

const useStyles = createUseStyles({
    page: {
      height: '100%',
      background: '#E9EAEC',
    },
    main: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90%',
    },
    menu: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      border: "2px solid #385E72",
      borderRadius: 5,
      width: '50vw',
      padding: 90,
      background: 'white',
      "& > h1": {
        letterSpacing: 10,
        fontSize: 50,
        color: '#385E72',
        fontFamily: 'Gill Sans',
        textDecoration: 'underline',
        textDecorationThickness: '0.1rem',
        textUnderlineOffset: "10px"
      },
    },
    buttons: {
      display: 'flex',
      alignContent: 'space-around',
        "& > a": {
            "& > button": {
              width: 300,
              height: 70,
              margin: 50,
              cursor: 'pointer',
              fontSize: 20,
              letterSpacing: 6,
              background: '#D9E4EC',
              border: 'none',
              borderRadius: 5,
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
    }
  })

const Main = (props) => {
    const classes = useStyles();
    const { isLoggedIn } = useContext(LoginContext);

  return isLoggedIn === false ? (
    <div className={classes.page}>
    <NavBar></NavBar>
    <div className={classes.main}>
      <div className={classes.menu}>
          <h1>Web Domains Analytics</h1>
          <div className={classes.buttons}>
              <Link to="/login" style={{ textDecoration: 'none' }}><Button>Login</Button></Link>
              <Link to="/register" style={{ textDecoration: 'none' }}><Button>Register</Button></Link>
          </div>
      </div>
    </div>
    </div>
  ) : (
    <>
    <NavBar></NavBar>
    <Landing login={props.isLoggedIn}></Landing>
    </>
  )
}

export default Main