import React from 'react'
import { createUseStyles } from "react-jss";
import { useRef, useState, useEffect, useContext } from 'react';
import { BASE_URL } from '../utils/base_url';
import axios from 'axios';
import Histogram from './Histogram';
//import Wordcloud from './WordCloud';
import Sentiment from './Sentiment';
import Classification from './Classification';
import { ProgressBar } from 'react-loader-spinner';
import { DomainContext } from '../contexts/domains';

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
      justifyContent: 'space-around',
      alignItems: 'center',
      background: 'white',
      marginBottom: 10,
      marginLeft: 20,
      border: "2px solid #385E72",
      borderRadius: 5,
      width: '25vw',
      minHeight: '70vh',
      '@media (max-width: 960px)': {
        width: '93%',
        marginLeft: 12
      },
      '& > h3': {
        fontFamily: 'Gill Sans',
        fontSize: '1.5rem',
        letterSpacing: '0.3rem',
        color: '#191970'
      },
      '&:nth-child(1)': {
        flexDirection: 'column',
      }
    },
  },
  inputs: {
    display: 'flex',
    justifyContent: 'space-around',
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
    width: "50%"
  },
  button: {
    minWidth: '6vw',
    padding: '12px 20px',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    background: '#D9E4EC',
    fontWeight: 'bold',
    fontSize: "1rem",
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
  buttonDis: {
    minWidth: '6vw',
    padding: '12px 20px',
    border: 'none',
    borderRadius: 5,
    background: '#D9E4EC',
    fontWeight: 'bold',
    fontSize: "1rem",
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
    const { domain, changeDomain } = useContext(DomainContext)
    const [url, setUrl] = useState({ words: "" })
    const [wordNum, setWordNumb] = useState({total: 0, frequency: 0})
    const [wordFound, setWordFound] = useState();
    const [isLoading, setIsLoading] = useState(false); 
    const [isScraping, setIsScraping] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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
              setIsLoaded(true);
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
        } else {
          // Make a 'POST' request to scrape the website
          setIsLoading(false);
          setIsScraping(true);
          await axios.post(`${BASE_URL}/scrapy/scrape`, { url: urlInput });
        }
      } catch (error) {
        console.error(error.response.data)
      } finally {
        setIsLoading(false)
        setIsLoaded(true)
      }
    }

    // Take list of ngrams out of the fetched data
    const getWords = async (word) => {

      //Count the number of spaces (' ') to know if it is word, bigram or trigram
      let spaceCount = 0;

      for (let i = 0; i < word.length; i++) {
        if (word[i] === ' ') {
          spaceCount++;
        }
      }

      let wordObject;

      try {
        if(spaceCount === 0){
          wordObject = url.words
        }
        else if(spaceCount === 1){
          wordObject = url.bigrams
        }
        else if(spaceCount === 2){
          wordObject = url.trigrams
        }
        else{
          setWordFound(false)
        }

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
        <h4>No matches</h4>
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

    useEffect(() => {
      // Function to handle screen size changes
      function handleResize() {
        setScreenWidth(window.innerWidth)
      }
      // Attach the handleResize function to the window's resize event
      window.addEventListener('resize', handleResize);
      // Call handleResize initially to apply styles based on the initial screen size
      handleResize();
    }, [window.innerWidth])
    
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
          <div className={classes.inputs}>  
            <input
                className={classes.wordInput}
                type='text'
                ref={urlRef}
                placeholder='https://'
                value={domain ? domain :  null}
                onClick={() => {changeDomain(false)}} //Set domain to false to be able to write on input.  
                required>
            </input>
            {loading}
          </div>
          <h3>Find n-gram: </h3>
          <div className={classes.inputs}>  
            {!isLoaded ? (
              <>
                <input className={classes.wordInput} type='text' ref={wordRef} required disabled></input>
                <input className={classes.buttonDis} onClick={handleSubmitWord} type="submit" value="Check" disabled></input>
              </>
              ) : (
              <>
                <input className={classes.wordInput} type='text' ref={wordRef} required></input>
                <input className={classes.button} onClick={handleSubmitWord} type="submit" value="Check"></input>
              </>
              )
            }
          </div>
          {result}   
        </div>
        <Histogram isLoaded={isLoaded} data={url.words} ner={url.ner} bigrams={url.bigrams} trigrams={url.trigrams} screen={screenWidth}></Histogram>
        {/* <Wordcloud data={url.words} bigrams={url.bigrams} trigrams={url.trigrams} mode={outputMode}></Wordcloud> */}
        <Sentiment data={url.sentiment} ai_data={url.AI_Sentiment}></Sentiment>
        <Classification data={url.classification}></Classification>
      </div>
    </div>
  )
}

export default Landing