import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react';
import { BASE_URL } from '../utils/base_url';
import axios from 'axios';
import Histogram from './Histogram';
//import Wordcloud from './WordCloud';
import Sentiment from './Sentiment';
import Classification from './Classification';
import { ProgressBar } from 'react-loader-spinner';
import { DomainContext } from '../contexts/domains';
import '../styles/Landing.css'


const Landing = (props) => {
  const wordRef = useRef();
  const urlRef = useRef();
  const [limit, setLimit] = useState(1)
  const { domain, changeDomain } = useContext(DomainContext)
  const [url, setUrl] = useState({ words: "" })
  const [wordNum, setWordNumb] = useState({ total: 0, frequency: 0 })
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
          const res = await axios.get(`${BASE_URL}/scrapy`, {
            params:
            {
              domain: urlRef.current.value,
              limit: limit
            }
          });
          if (res.data.data) {
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
  }, [isScraping, limit])

  const getURL = async (urlInput) => {

    setIsLoading(true)
    if (urlInput === "") {
      alert("Enter a Valid URL");
      setIsLoading(false)
      return;
    };
    try {
      const res = await axios.get(`${BASE_URL}/scrapy`, {
        params:
        {
          domain: urlInput,
          limit: limit
        }
      });
      if (res.data.data) {
        setUrl(res.data.data);
      } else {
        // Make a 'POST' request to scrape the website
        setIsLoading(false);
        setIsScraping(true);
        await axios.post(`${BASE_URL}/scrapy/scrape`, { url: urlInput, LIMIT: limit });
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

  // Word count conditional output
  const result = wordFound === true ? (
    <div className={"results"}>
      <h4>Total: {wordNum.total}</h4>
      <h4>Frequency: {wordNum.frequency}</h4>
    </div>
  ) : wordFound === false ? (
    <div className={"results"}>
      <h4>No matches</h4>
      <h4 style={{ color: 'white' }}>Total:</h4>
    </div>
  ) : (
    <div className={"results"}>
      <h4 style={{ color: 'white' }}>Total:</h4>
      <h4 style={{ color: 'white' }}>Frequency:</h4>
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

  const form = (
    <>
      <input
        disabled={isScraping}
        className={"wordInput"}
        type='text'
        ref={urlRef}
        placeholder='https://'
        value={domain ? domain : null}
        onClick={() => { changeDomain(false) }} //Set domain to false to be able to write on input.  
        required
      />
      <div>
        <h4>Crawl Length</h4>
        <input disabled={isScraping} onClick={() => setLimit(1)} checked={limit === 1 ? true : false} type='radio' id="singlePage" name="crawlLength" />
        <label for="singlePage" >Single Page</label>
        <input disabled={isScraping} onClick={() => setLimit(50)} type='radio' id="manyPages" name="crawlLength" />
        <label for="manyPages" >Deep Search</label>
      </div>
      <input disabled={isScraping} className={"button"} onClick={() => getURL(urlRef.current.value)} type='submit' value='Check'></input>
      {loading}
    </>
  )
  return (
    <div>
      <div className={"page"}>
        <div>
          <h3>Choose a URL</h3>
          <div className={"inputs"}>
            {form}
          </div>
          <h3>Find n-gram: </h3>
          <div className={"inputs"}>
            <input disabled={!isLoaded} className={"wordInput"} type='text' ref={wordRef} required></input>
            <input disabled={!isLoaded} className={"button"} onClick={handleSubmitWord} type="submit" value="Check"></input>
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