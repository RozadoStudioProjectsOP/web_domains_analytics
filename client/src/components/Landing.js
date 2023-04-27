import React from 'react'
import { createUseStyles } from "react-jss";
import { useRef, useState } from 'react';
import { BASE_URL } from '../utils/base_url';
import axios from 'axios';
import Histogram from './Histogram';

const useStyles = createUseStyles({
  page: {
    height: '90%',
    background: '#E9EAEC',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'white',
      border: "2px solid #385E72",
      borderRadius: 5,
      width: '60vw',
      minHeight: '50vh',
      '& > h3': {
        fontFamily: 'Gill Sans',
        fontSize: '2rem',
        letterSpacing: '0.3rem',
        color: '#191970'
      }
    }
  },
  inputs: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  wordInput: {
    padding: 15,
    fontSize: "1rem",
    fontWeight: "bold",
  },
  button: {
    width: '10rem',
    padding: '12px 20px',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    background: '#D9E4EC',
    fontWeight: 'bold',
    fontSize: "1rem",
    marginLeft: 20,
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
  },
  results: {
    marginTop: 30,
    color: '#191970',
    fontSize: "1.2rem"
  }
  })

const Landing = (props) => {
    const classes = useStyles();
    const wordRef = useRef(); 
    const [wordNum, setWordNumb] = useState({
      total: 0,
      frequency: 0
    })
    const [wordFound, setWordFound] = useState();
    const [wordList, setWordList] = useState();

    const getWords = async (word) => {
      try {
        const res = await axios.get(`${BASE_URL}/scrapy`, {
        })
        const wordObject = res.data.data[1].words
        setWordList(wordObject)
        //Find the word that matches in DB
        for (const w in wordObject) {
          if (w === word) {
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
      <div className={classes.results}>
        <h4>Total: {wordNum.total}</h4>
        <h4>Frequency: {wordNum.frequency}</h4>
      </div>
    ) : wordFound === false ? (
      <div className={classes.results}>
        <h4>Sorry, word not found</h4>
      </div>
    ) : (
      <></>
    )

    const handleSubmit = (e) => {
      e.preventDefault()
      getWords(wordRef.current.value)
    }

  return (
    <div className={classes.page}>
        <div>
          <h3>Choose a word: </h3>
          <div className={classes.inputs}>  
            <input
                className={classes.wordInput}
                type='text'
                ref={wordRef}
                required>
            </input>
            <input className={classes.button} onClick={handleSubmit} type="submit" value="Check"></input>
          </div>
          {result}   
        </div>
        <Histogram data={wordList}></Histogram>
    </div>
  )
}

export default Landing