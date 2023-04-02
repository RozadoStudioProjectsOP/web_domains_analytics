import React from 'react'
//import { createUseStyles } from "react-jss";
import { useRef } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/base_url';

// const useStyles = createUseStyles({

//   })

const Landing = () => {
    //const classes = useStyles();
    const wordRef = useRef(); 

    const getWords = async () => {
      
      try {
          const res = await axios.get(`${BASE_URL}/scrapy`, {
          })
          console.log(res)
      } catch (error) {
          console.error(error.response.data)
      }
  
    }

  return (
    <>
        <h2>Word count comparison</h2>
        <h3>Word to compare: </h3>
        <input
            type='text'
            ref={wordRef}
            required>
        </input>
        <input onClick={getWords} type="submit" value="Check"></input>
        <></>
    </>
  )
}

export default Landing