import React from 'react'
import { Button } from 'reactstrap'
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import { useContext, useRef, useEffect, useState } from 'react';
import { LoginContext } from '../contexts/login';
import { WidthContext } from '../contexts/screenWidth';
import Landing from './Landing';
import NavBar from './NavBar';
import background from '../media/andyone--WW8jBak7bo-unsplash.jpg'
import sentimentVideo from '../media/Recording_sentiment.mp4'
import classificationVideo from '../media/Recording_classification.mp4'
import { Dna } from 'react-loader-spinner';
import histogramVideo from '../media/Recording_histogram.mp4'
import FontFaceObserver from 'fontfaceobserver'

const useStyles = createUseStyles({
  page: {
    height: '100%',
    background: '#E9EAEC',
  },
  section: {
    height: '80vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    '& > div': {
      marginTop: '10vh',
      marginBottom: '5vh',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      background: 'rgb(255,255,255,0.3)',
      boxShadow: '10px 10px 5px rgba(0, 0, 0, 0.3)',
      maxWidth: '80%',
      height: 'auto',
      padding: 20,
      borderRadius: 20,
      '@media (max-width: 925px)': {
        flexDirection: 'column-reverse',
        maxWidth: '95%',
        margin: 0,
        marginTop: 10,
        boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.3)',
      },
      '& > h2': {
        textWrap: 'wrap',
        color: '#191970',
        fontFamily: 'Consolas, monaco, monospace',
        fontSize: '2.5vw',
        letterSpacing: '0.5rem',
        textTransform: 'uppercase',
        lineHeight: '1.8em',
        fontWeight: 'bold',
        maxWidth: '41%',
        textShadow: '2px 2px 0 rgb(0, 0, 0, 0.2)',
        '@media (max-width: 925px)': {
          maxWidth: '80%',
          textAlign: 'center',
          fontSize: '5vw'
        },
      },
    },
  },
  sectionRev: {
    '& > div': {
      '@media (max-width: 925px)': {
        flexDirection: 'column'
      },
      '& > h2': {
        textAlign: 'right',
        '@media (max-width: 925px)': {
          textAlign: 'center'
        },
      },
    },
  },
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url(' + background + ')',
    backgroundSize: 'cover',
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
      fontSize: 80,
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
  },
  videoDiv: {
    borderRadius: 20,
    maxHeight: '100%',
    maxWidth: '47%',
    overflow: 'hidden',
    boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.2)',
    '@media (max-width: 925px)': {
      maxWidth: '90%',
    },
  }
})

//Initial page 

const Main = (props) => {
  const classes = useStyles();
  const { isLoggedIn } = useContext(LoginContext);
  const { screenWidth } = useContext(WidthContext);
  const videoRef = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    if (videoRef.current != null && videoRef2.current != null && videoRef3.current != null) {
      // When the component mounts, play the video when it's ready
      videoRef.current.addEventListener('canplay', () => {
        videoRef.current.play();
      });
      videoRef2.current.addEventListener('canplay', () => {
        videoRef2.current.play();
      });
      videoRef3.current.addEventListener('canplay', () => {
        videoRef3.current.play();
      });
    }
  }, [videoRef.current, isLoggedIn, imageLoaded, fontLoaded, isReady]); // eslint-disable-line

  useEffect(() => {
    // Load the image
    const image = new Image();
    image.src = background;

    image.onload = () => {
      setImageLoaded(true);
    };

    // Check if the font is loaded
    const font = new FontFaceObserver('DO Futuristic');
    font.load().then(() => {
      setFontLoaded(true);
    });

    const prepare = async () => {
      try {
        // Artificially delay for 3 seconds to simulate a slow loading
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (err) {
        console.log(err);
      } finally {
        setIsReady(true);
      }
    };
    prepare(); 
  }, []);


  return isLoggedIn === false ? (
    <div className={classes.page}>
      {imageLoaded && fontLoaded && isReady ? (
      <>
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

      <section className={classes.section}>
        <div>
          <div className={classes.videoDiv}>
            <video ref={videoRef3} width="100%" height="100%" autoplay loop muted>
              <source src={histogramVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <h2>
            Display the most repeated words, nGrams and Name Entities
          </h2>
        </div>
      </section>

      <section className={`${classes.section} ${classes.sectionRev}`}>
        <div>
          <h2>
            Analyze text sentiment with Meta's Llama2 LLM model
          </h2>
          <div className={classes.videoDiv}>
            <video ref={videoRef} width="100%" height="100%" autoplay loop muted>
              <source src={sentimentVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      <section className={classes.section}>
        <div>
          <div className={classes.videoDiv}>
            <video ref={videoRef2} width="100%" height="100%" autoplay loop muted>
              <source src={classificationVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <h2>
            Get URL's classified into various predefined categories
          </h2>
        </div>
      </section>
      </>
      ) : (
      <div style={{display: 'flex', width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
      <Dna visible={true}
        height="300"
        width="300"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"/>
      </div>
      )}

    </div>
  ) : (
    <>
      <NavBar></NavBar>
      <Landing login={props.isLoggedIn}></Landing>
    </>
  )
}

export default Main