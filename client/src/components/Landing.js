import React from 'react'
//import { createUseStyles } from "react-jss";
import { useRef, useState, useContext } from 'react';
import { BASE_URL } from '../utils/base_url';
import axios from 'axios';

// const useStyles = createUseStyles({

//   })

const Landing = (props) => {
    //const classes = useStyles();
    const wordRef = useRef(); 
    const [setMatch] = useState()
    const [wordNum, setWordNumb] = useState({
      total: 0,
      frequency: 0
    })
    const [wordFound, setWordFound] = useState()

    const getWords = async (word) => {
 
      try {
          const res = await axios.get(`${BASE_URL}/scrapy`, {
          })
          
          const wordObject = res.data.data[1].words
          //console.log(wordObject)
          //Find the word that matches in DB
          for (const w in wordObject) {
            //console.log(wordObject[w].Total)
            if (w === word) {
              setMatch(w)
              setWordNumb({
                total: wordObject[w].Total,
                frequency: wordObject[w].Frequency
              })
              setWordFound(true)
              return
            }
            setWordFound(false)
          }
          
      } catch (error) {
          console.error(error.response.data)
      }
  
    }

    // Word count conditional output
    const result = wordFound === true ? (
      <>
        <h3>Total: {wordNum.total}</h3>
        <h3>Frequency: {wordNum.frequency}</h3>
      </>
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