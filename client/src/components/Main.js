import React from 'react'
import { Button } from 'reactstrap'
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { LoginContext } from '../contexts/login';
import Landing from './Landing';

// background: rgb(2,0,36);
// background: linear-gradient(117deg, rgba(2,0,36,1) 0%, rgba(9,121,84,1) 35%, rgba(0,212,255,1) 100%);

const useStyles = createUseStyles({
    main: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#E9EAEC',
      height: '100%',
    },
    menu: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: '50vw',
      border: '3px solid #385E72',
      borderRadius: 5,
      padding: 90,
      background: 'white',
      "& > h1": {
        letterSpacing: 10,
        fontSize: 50,
        wordSpacing: '80vw', 
        marginRight: 80,
        lineHeight: 2.3,
        color: '#191970',
        fontFamily: 'Gill Sans',
      }
    },
    buttons: {
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'space-around',
      flexWrap: 'wrap',
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
    <div className={classes.main}>
      <div className={classes.menu}>
        <h1>Web Domains Analytics</h1>
        <div className={classes.buttons}>
            <Link to="/login" style={{ textDecoration: 'none' }}><Button>Login</Button></Link>
            <Link to="/register" style={{ textDecoration: 'none' }}><Button>Register</Button></Link>
        </div>
      </div>
    </div>
  ) : (
    <Landing login={props.isLoggedIn}></Landing>
  )
}

export default Main