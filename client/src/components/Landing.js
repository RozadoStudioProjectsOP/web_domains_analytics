import React from 'react'
//import { createUseStyles } from "react-jss";
import { useRef, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/base_url';

// const useStyles = createUseStyles({

//   })

const Landing = () => {
    //const classes = useStyles();
    const wordRef = useRef(); 
    const [match, setMatch] = useState()
    const [wordNum, setWordNumb] = useState(0)
    const [wordFound, setWordFound] = useState()

    const getWords = async (word) => {
 
      try {
          const res = await axios.get(`${BASE_URL}/scrapy`, {
          })
          
          const wordObject = res.data.data[0].words

          for (const w in wordObject) {
            if (w === word) {
              setMatch(w)
              setWordNumb(wordObject[w])
              setWordFound(true)
              return
            }
            setWordFound(false)
          }

      } catch (error) {
          console.error(error.response.data)
      }
  
    }

    const result = wordFound === true ? (
      <h3>{match}: {wordNum}</h3>
    ) : wordFound === false ? (
      <h3>Word not found</h3>
    ) : (
      <></>
    )

    const handleSubmit = (e) => {
      e.preventDefault()
      getWords(wordRef.current.value)
    }

  return (
    <>
        <h3>Word to count: </h3>
        <input
            type='text'
            ref={wordRef}
            required>
        </input>
        <input onClick={handleSubmit} type="submit" value="Check"></input>
        {result}
    </>
  )
}

export default Landing