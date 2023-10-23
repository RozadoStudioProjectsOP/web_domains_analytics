import React from 'react'
import { createUseStyles } from "react-jss";
import { useState, useEffect } from 'react';
import Llama2 from './LLama2';
import Llama2PosNeg from './llama2posNeg';

const useStyles = createUseStyles({
  window: {
    minWidth: '47.5vw',
    minHeight: '60vh',
    height: '80vh',
    display: 'flex',
    flexDirection: 'row',
    '@media (max-width: 960px)': {
      flexDirection: 'column'
    },
  },
  neutral: {
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
    '@media (max-width: 960px)': {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'baseline',
      width: '50%',
    },
  },
  button: {
    minWidth: '6vw',
    padding: '12px 20px',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    background: '#D9E4EC',
    fontWeight: 'bold',
    marginRight: 15,
    boxShadow: "4px 4px 5px 1px rgba(0, 0, 0, 0.25)",
    transition: "transform 50ms",
    '@media (max-width: 960px)': {
      margin: 0,
      marginBottom: 20
    },
    '&:hover': {
      background: '#385E72',
      color: 'white'
    },
    "&:active": {
      transform: "translateY(4px)",
      boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0.75)",
    }
  },
  buttonDis: {
    minWidth: '6vw',
    padding: '12px 20px',
    border: 'none',
    borderRadius: 5,
    background: '#D9E4EC',
    fontWeight: 'bold',
    marginRight: 15,
    '@media (max-width: 960px)': {
      margin: 0,
      marginBottom: 20
    },
  }
})

const Sentiment = (props) => {

  const classes = useStyles();
  const [toggle, setToggle] = useState(false)
  const [buttonDisabled, setButtonDissabled] = useState(true)

  useEffect(() => {
    if (props) {
      setButtonDissabled(false)
    }
  }, [props])

  return (
    <div className={classes.window}>
      {!toggle ? (
        <Llama2PosNeg data={props.llamaPosNeg}></Llama2PosNeg>
      ) : (
        <Llama2 data={props.llamaSent}></Llama2>
      )}

      <div className={classes.neutral}>
        {buttonDisabled ? (
          <button className={classes.buttonDis} onClick={() => setToggle(!toggle)} disabled>Change</button>
        ) : (
          <button className={classes.button} onClick={() => setToggle(!toggle)}>Change</button>
        )}
      </div>
    </div>
  );
}

export default Sentiment