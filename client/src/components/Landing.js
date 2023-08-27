import React from 'react'
import { createUseStyles } from "react-jss";
import { useRef, useState, useEffect } from 'react';
import { BASE_URL } from '../utils/base_url';
import axios from 'axios';
import Histogram from './Histogram';
//import Wordcloud from './WordCloud';
import Sentiment from './Sentiment';
import Classification from './Classification';
import { ProgressBar } from 'react-loader-spinner';

const useStyles = createUseStyles({
  page: {
    height: "auto",
    background: '#E9EAEC',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'white',
      marginBottom: 10,
      marginLeft: 20,
      border: "2px solid #385E72",
      borderRadius: 5,
      width: '35vw',
      height: '70vh',
      // '&:nth-child(3)': { //Word cloud
      //   minWidth: '60vw',
      //   height: 'auto',
      //   minHeight: '60vh'
      // },
      '& > h3': {
        fontFamily: 'Gill Sans',
        fontSize: '2rem',
        letterSpacing: '0.3rem',
        color: '#191970'
      }
    },
  },
  inputs: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > div': {
      display: 'flex',
      alignItems: 'center',
      marginTop: 20,
      width: '80%',
    },
  },
  wordInput: {
    padding: 15,
    fontSize: "1rem",
    fontWeight: "bold",
  },
  button: {
    width: '10vw',
    padding: '12px 20px',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    background: '#D9E4EC',
    fontWeight: 'bold',
    fontSize: "1rem",
    marginLeft: 5,
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
    color: '#191970',
    fontSize: "1.2rem"
  }
  })

const Landing = (props) => {
    const classes = useStyles();
    const wordRef = useRef(); 
    const urlRef = useRef(); 
    const [limit, setLimit] = useState()
    const [outputMode, setOutputMode] = useState()
    const [url, setUrl] = useState({ words: "" })
    const [singlePage, setSinglePage] = useState(undefined)
    const [wordNum, setWordNumb] = useState({total: 0, frequency: 0})
    const [wordFound, setWordFound] = useState();
    const [isLoading, setIsLoading] = useState(false); 
    const [isScraping, setIsScraping] = useState(false);

    useEffect(() => {
      // while data is being scraped
      if (isScraping) {
        const interval = setInterval(async () => {
          try {
            // requests to backend are made every 5 seconds
            // to check if the scraping is complete
            const res = await axios.get(`${BASE_URL}/scrapy`, { params: 
              { 
                domain: urlRef.current.value, 
                limit: limit
              }
            });
            if (res.data.data) {
              setUrl(res.data.data);
              setSinglePage(res.data.data.singlePage)
              setOutputMode('words');
              setIsScraping(false);
            }
          } catch (error) {
            console.error(error.response.data);
            setIsScraping(false);
          }
        }, 5000);
        return () => clearInterval(interval);
      }
    }, [isScraping, limit])

    const getURL = async (urlInput, LIMIT) => {

      setIsLoading(true)
      if (urlInput === "") {
        alert("Enter a Valid URL");
        setIsLoading(false)
        return;
      };
      try {
        const res = await axios.get(`${BASE_URL}/scrapy`, { params: 
          { 
            domain: urlInput, 
            limit: LIMIT
          }
        });
        if (res.data.data) {       
          setSinglePage(res.data.data.singlePage)
          setUrl(res.data.data);
          setOutputMode('words');
        } else {
          // Make a 'POST' request to scrape the website
          setIsLoading(false);
          setLimit(LIMIT)
          setIsScraping(true);
          await axios.post(`${BASE_URL}/scrapy/scrape`, { url: urlInput, LIMIT: LIMIT });
        }
      } catch (error) {
        console.error(error.response.data)
      } finally {
        setIsLoading(false)
      }
    }

    // Take list of words out of the fetched data
    const getWords = async (word) => {
      try {
        const wordObject = url.words

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
        <h4 style={{color: 'white'}}>Total:</h4>
      </div>
    ) : (
      <div className={classes.results}>
        <h4 style={{color: 'white'}}>Total:</h4>
        <h4 style={{color: 'white'}}>Frequency:</h4>
      </div>
    )

    const handleSubmitURL = (e, LIMIT) => {
      e.preventDefault()
      getURL(urlRef.current.value, LIMIT)
    }  

    const handleSubmitWord = (e) => {
      e.preventDefault()
      getWords(wordRef.current.value)
    }

    const handleModeSelection = (mode) => {
      setOutputMode(mode)
    }
    
    // refactored conditional rendering checks for loading and scraping
    const loading = isLoading ? 
    ( 
      <div>
        <ProgressBar height={50} width={180}/>
        <h4>Loading...</h4>
      </div>
    ) : isScraping ? 
    ( 
      <div>
        <ProgressBar height={50} width={180}/>
        <h4>Scraping...this may take a while</h4>
      </div>
    ) : ( 
    <>
      <input disabled={singlePage === undefined ? false : !singlePage} className={classes.button} onClick={(e)=> handleSubmitURL(e, 4)} type="submit" value="Deep Scrape"></input> 
      <input disabled={singlePage === undefined ? false : singlePage} className={classes.button} onClick={(e)=> handleSubmitURL(e, 1)} type="submit" value="Quick Scrape"></input>
    </>
    )

    const ngrams = !isLoading && !isScraping ? (
      <div>
        <input className={classes.button} onClick={() => handleModeSelection('words')} type="submit" value="Words"></input>
        <input className={classes.button} onClick={() => handleModeSelection('bigrams')} type="submit" value="Bigrams"></input>
        <input className={classes.button} onClick={() => handleModeSelection('trigrams')} type="submit" value="Trigrams"></input>
        <input className={classes.button} onClick={() => handleModeSelection('ner')} type="submit" value="NER"></input>
      </div>
    ) : (
      <></>
    )
  return (
    <div>
      <div className={classes.page}>
        <div>
          <h3>Choose a URL</h3>
          {/* <p>books.toscrape.com | quotes.toscrape.com | scrapethissite.com/</p> */}
          <div className={classes.inputs}>  
            <input
                disabled={isScraping}
                className={classes.wordInput}
                type='text'
                ref={urlRef}
                required>
            </input>
            {loading}
            {ngrams}
          </div>
          <h3>Choose a word: </h3>
          <div className={classes.inputs}>  
            <input
                className={classes.wordInput}
                type='text'
                ref={wordRef}
                required>
            </input>
            <input className={classes.button} onClick={handleSubmitWord} type="submit" value="Check"></input>
          </div>
          {result}   
        </div>
        <Histogram data={url.words} ner={url.ner} bigrams={url.bigrams} trigrams={url.trigrams} mode={outputMode}></Histogram>
        {/* <Wordcloud data={url.words} bigrams={url.bigrams} trigrams={url.trigrams} mode={outputMode}></Wordcloud> */}
        <Sentiment data={url.sentiment} ai_data={url.AI_Sentiment}></Sentiment>
        <Classification data={url.classification}></Classification>
      </div>
    </div>
  )
}

export default Landing