import React from 'react'
import { Button } from 'reactstrap'
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { LoginContext } from '../contexts/login';
import { WidthContext } from '../contexts/screenWidth';
import Landing from './Landing';
import NavBar from './NavBar';
import background from '../media/andyone--WW8jBak7bo-unsplash.jpg'

const useStyles = createUseStyles({
    page: {
      height: '100%',
      background: '#E9EAEC',
      backgroundImage: 'url(' + background + ')',
      backgroundSize: 'cover'
    },
    main: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    menu: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderRadius: 5,
      width: '98vw',
      height: '90vh',
      boxShadow: '15px 15px 5px rgba(0, 0, 0, 0.7)',
      background: 'rgb(233,234,236,0.7)',
      '@media (min-width: 926px)': {
        width: '60%',
        maxWidth: '1100px',
        height: 'auto'
      },
      "& > h1": {
        letterSpacing: 10,
        fontSize: 70,
        color: '#191970',
        textAlign: 'center',
        fontFamily: 'DO Futuristic',
        borderWidth: 5,
        padding: 25,
        lineHeight: 1.5,
        '@media (max-width: 500px)': {
          fontSize: 50
        },
      },
    },
    buttons: {
      display: 'flex',
      alignContent: 'space-around',
      justifyContent: 'center',
      flexWrap: 'wrap',
        "& > a": {
            "& > button": {
              width: "20vw",
              minWidth: 180,
              height: "8vh",
              margin: 30,
              cursor: 'pointer',
              fontSize: "1.5rem",
              letterSpacing: "0.3rem",
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

//Initial page 

const Main = (props) => {
    const classes = useStyles();
    const { isLoggedIn } = useContext(LoginContext);
    const { screenWidth } = useContext(WidthContext);
    
  return isLoggedIn === false ? (
    <div className={classes.page}>
      <NavBar></NavBar>
      <div className={classes.main}>
        <div className={classes.menu}>
            <h1>Web Domains Analytics</h1>
            {screenWidth <= 700 ? ( // Show login register buttons if screen < 700px
            <div className={classes.buttons}>
              <Link to="/login" style={{ textDecoration: 'none' }}><Button>Login</Button></Link>
              <Link to="/register" style={{ textDecoration: 'none' }}><Button>Register</Button></Link>
            </div>        
            ) : null}
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