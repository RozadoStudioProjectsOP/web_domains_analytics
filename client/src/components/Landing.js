import React from 'react'
import { createUseStyles } from "react-jss";
import { useRef } from 'react';

const useStyles = createUseStyles({

  })

const Landing = () => {
    const classes = useStyles();
    const wordRef = useRef(); 

  return (
    <>
        <h2>Word count comparison</h2>
        <h3>Word to compare: </h3>
        <input
            type='text'
            ref={wordRef}
            required>
        </input>
        <input type="submit" value="Check"></input>
        <></>
    </>
  )
}

export default Landing