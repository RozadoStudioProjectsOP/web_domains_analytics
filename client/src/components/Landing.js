import React from 'react'
import { createUseStyles } from "react-jss";
import { useRef, useState, useEffect } from 'react';
import { BASE_URL } from '../utils/base_url';
import axios from 'axios';
import Histogram from './Histogram';
import Wordcloud from './WordCloud';
import Sentiment from './Sentiment';
import { ProgressBar } from 'react-loader-spinner';

const useStyles = createUseStyles({
  page: {
    height: "auto",
    background: '#E9EAEC',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'white',
      marginBottom: 10,
      border: "2px solid #385E72",
      borderRadius: 5,
      width: '35vw',
      height: '70vh',
      '&:nth-child(3)': { //Word cloud
        minWidth: '60vw',
        height: 'auto',
        minHeight: '60vh'
      },
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
    color: '#191970',
    fontSize: "1.2rem"
  }
  })

const Landing = (props) => {
    const classes = useStyles();
    const wordRef = useRef(); 
    const urlRef = useRef(); 
    const [outputMode, setOutputMode] = useState()
    const [url, setUrl] = useState({ words: "" })
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
            const res = await axios.get(`${BASE_URL}/scrapy/domains`);
            const foundUrl = res.data.data.find((u) => u === urlRef.current.value);
            // when it is complete, the data is fetched
            if (foundUrl) {
              const res = await axios.get(`${BASE_URL}/scrapy`, { params: { domain: foundUrl }});
              setUrl(res.data.data);
              setIsScraping(false);
            }
          } catch (error) {
            console.error(error.response.data);
            setIsScraping(false);
          }
        }, 5000);
        return () => clearInterval(interval);
      }
    }, [isScraping])

    const getURL = async (urlInput) => {

      setIsLoading(true)
      if (urlInput === "") {
        alert("Enter a Valid URL");
        setIsLoading(false)
        return;
      };
      try {
        // refactor:
        // changed request to get only a list of domains from db
        // instead of requesting all data for every scraped site
        const res = await axios.get(`${BASE_URL}/scrapy/domains`)
        const urlArray = res.data.data
        // changed urlArray.ForEach to .find
        const foundUrl = urlArray.find((u) => u === urlInput)
        // request data for the url if found, otherwise scrape the url
        if (foundUrl) {
          const res = await axios.get(`${BASE_URL}/scrapy`, { params: { domain: foundUrl }});
          setUrl(res.data.data);
          setOutputMode('words');
        } else {
          // Make a 'POST' request to scrape the website
          setIsScraping(true);
          await axios.post(`${BASE_URL}/scrapy/scrape`, { url: urlInput });
        }
      } catch (error) {
        console.error(error.response.data)
      } finally {
        setIsLoading(false)
      }
    }

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

    const handleSubmitURL = (e) => {
      e.preventDefault()
      getURL(urlRef.current.value)
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
    ) : ( <input className={classes.button} onClick={handleSubmitURL} type="submit" value="Select"></input> )

  return (
    <div>

    <div className={classes.page}>
        <div>
          <h3>Choose a URL</h3>
          <p>books.toscrape.com | quotes.toscrape.com | scrapethissite.com/</p>
          <div className={classes.inputs}>  
            <input
                className={classes.wordInput}
                type='text'
                ref={urlRef}
                required>
            </input>
            {loading}
            <div>
              <input className={classes.button} onClick={() => handleModeSelection('words')} type="submit" value="Words"></input>
              <input className={classes.button} onClick={() => handleModeSelection('bigrams')} type="submit" value="Bigrams"></input>
              <input className={classes.button} onClick={() => handleModeSelection('trigrams')} type="submit" value="Trigrams"></input>
          </div>
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
        <Histogram data={url.words} bigrams={url.bigrams} trigrams={url.trigrams} mode={outputMode}></Histogram>
        <Wordcloud data={url.words} bigrams={url.bigrams} trigrams={url.trigrams} mode={outputMode}></Wordcloud>
        <Sentiment data={url.sentiment}></Sentiment>
    </div>
    </div>
  )
}

export default Landing