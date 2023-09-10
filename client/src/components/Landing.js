import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react';
import { BASE_URL } from '../utils/base_url';
import axios from 'axios';
import Histogram from './Histogram';
//import Wordcloud from './WordCloud';
import Search from './Search';
import Sentiment from './Sentiment';
import Classification from './Classification';
import { ProgressBar } from 'react-loader-spinner';
import { DomainContext } from '../contexts/domains';
import '../styles/Landing.css'
import { checkUrl } from '../utils/checkUrl.js';


const Landing = (props) => {
  const wordRef = useRef();
  const urlRef = useRef();
  const [limit, setLimit] = useState()
  const { domain, changeDomain } = useContext(DomainContext)
  const [url, setUrl] = useState({ words: "" })
  const [singlePage, setSinglePage] = useState(undefined)
  const [wordNum, setWordNumb] = useState({ total: 0, frequency: 0 })
  const [wordFound, setWordFound] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isScraping, setIsScraping] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [collectionFound, setCollectionFound] = useState(undefined);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    // while data is being scraped
    if (isScraping) {
      const interval = setInterval(async () => {
        try {
          // requests to backend are made every 5 seconds
          // to check if the scraping is complete
          const res = await axios.get(`${BASE_URL}/scrapy`, {
            params:
            {
              domain: urlRef.current.value,
              limit: limit
            }
          });
          if (res.data.data) {
            setUrl(res.data.data);
            setSinglePage(res.data.data.singlePage)
            setIsScraping(false);
            setCollectionFound(true);
            setIsLoaded(true);
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
      setIsLoaded(false)
      setUrl({ words: "" })
      if (urlInput === "") {
        alert("Enter a Valid URL");
        setIsLoading(false)
        return;
      };

      const validatedURL = checkUrl(urlInput);

      try {
        const res = await axios.get(`${BASE_URL}/scrapy`, { params: 
          { 
            domain: validatedURL, 
            limit: LIMIT
          }
        });
        if (res.data.data) {       
          setCollectionFound(true);
          setUrl(res.data.data);
          setIsLoaded(true)
        } else {
          // Make a 'POST' request to scrape the website
          setCollectionFound(false);
          setIsLoading(false);
          setLimit(LIMIT)
          setIsScraping(true);
          await scrapeRequest(urlInput);
        }
    } catch (error) {
      console.error(error.response.data)
    } finally {
      setIsLoading(false)
    }
  }

  const scrapeRequest = async (urlInput) => {
    setIsScraping(true);
    await axios.post(`${BASE_URL}/scrapy/scrape`, { url: urlInput, LIMIT: limit });
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
      if (spaceCount === 0) {
        wordObject = url.words
      }
      else if (spaceCount === 1) {
        wordObject = url.bigrams
      }
      else if (spaceCount === 2) {
        wordObject = url.trigrams
      }
      else {
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

    const getDomains = async (domain) => {
      try {
        const res = await axios.get(`${BASE_URL}/scrapy/domains`, { params: { domain: domain } });
        setSearchResults(res.data.data)
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

    const handleSearch = (value) => {
      changeDomain(value)
      getDomains(value)
    }

    const handleSubmitURL = (e, LIMIT) => {
      e.preventDefault()
      getURL(urlRef.current.value, LIMIT)
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
  }, [])

  // refactored conditional rendering checks for loading and scraping
  const loading = isLoading ?
    (
      <div>
        <ProgressBar height={50} width={180} />
        <h4>Loading...</h4>
      </div>
    ) : isScraping ?
      (
        <div>
          <ProgressBar height={50} width={180} />
          <h4>Scraping...this may take a while</h4>
        </div>
      ) : (
        <></>
      )

  return (
    <div>
      <div className={"page"}>
        <div>
          <h3>Choose a URL</h3>
          <div className={classes.inputs}>  
            <input
                disabled={isScraping}
                className={classes.wordInput}
                type='text'
                ref={urlRef}
                placeholder='https://'
                value={domain ? domain :  null}
                onChange={(e) => handleSearch(e.target.value)}
                onClick={() => {changeDomain(false)}} //Set domain to false to be able to write on input.
                required>
            </input>
            {loading}
          </div>
          <Search results={searchResults}></Search>
          <h3>Find n-gram: </h3>
          <div className={"inputs"}>
            <input disabled={!isLoaded} className={"wordInput"} type='text' ref={wordRef} required></input>
            <input disabled={!isLoaded} className={"button"} onClick={() => getWords(wordRef.current.value)} type="submit" value="Check"></input>
          </div>
          {result}
        </div>
        <Histogram isLoaded={isLoaded} data={url.words} ner={url.ner} bigrams={url.bigrams} trigrams={url.trigrams} screen={screenWidth}></Histogram>
        {/* <Wordcloud data={url.words} bigrams={url.bigrams} trigrams={url.trigrams} mode={outputMode}></Wordcloud> */}
        <Sentiment data={url.sentiment} ai_data={url.AI_Sentiment} screen={screenWidth}></Sentiment>
        <Classification data={url.classification} screen={screenWidth}></Classification>
      </div>
    </div>
  )
}

export default Landing