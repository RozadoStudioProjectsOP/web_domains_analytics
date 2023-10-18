import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import { BASE_URL } from "../utils/base_url";
import axios from "axios";
import Histogram from "./Histogram";
//import Wordcloud from './WordCloud';
import Search from "./Search";
import Sentiment from "./Sentiment";
import Classification from "./Classification";
import { ProgressBar } from "react-loader-spinner";
import { DomainContext } from "../contexts/domains";
import { LoginContext } from '../contexts/login';
import { Navigate } from "react-router-dom";
import { checkUrl } from "../utils/checkUrl.js";
import "../styles/Landing.css";

const Landing = (props) => {
  const wordRef = useRef();
  const urlRef = useRef();
  const [limit, setLimit] = useState(1);
  const { domain, changeDomain } = useContext(DomainContext);
  const [url, setUrl] = useState({ words: "" });
  const [wordNum, setWordNumb] = useState({ total: 0, frequency: 0 });
  const [wordFound, setWordFound] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isScraping, setIsScraping] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [collectionFound, setCollectionFound] = useState(undefined);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isHome, setIsHome] = useState(false)
  const { changeLogin } = useContext(LoginContext); 

  useEffect(() => {
    // while data is being scraped
    if (isScraping) {
      const interval = setInterval(async () => {
        try {
          // requests to backend are made every 5 seconds
          // to check if the scraping is complete
          const res = await axios.get(`${BASE_URL}/scrapy`, {
            params: {
              domain: urlRef.current.value,
              limit: limit,
            },
          });
          if (res.data.data) {
            setUrl(res.data.data);
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
  }, [isScraping, limit]);

  const getURL = async (urlInput, LIMIT) => {
    setIsLoading(true);
    setIsLoaded(false);
    setUrl({ words: "" });
    if (urlInput === "") {
      alert("Enter a Valid URL");
      setIsLoading(false);
      return;
    }

    const validatedURL = checkUrl(urlInput);

    try {
      const res = await axios.get(`${BASE_URL}/scrapy`, {
        params: {
          domain: validatedURL,
          limit: LIMIT,
        },
      });
      if (res.data.data) {
        setCollectionFound(true);
        setUrl(res.data.data);
        setIsLoaded(true);
      } else {
        // Make a 'POST' request to scrape the website
        setCollectionFound(false);
        setIsLoading(false);
        setLimit(LIMIT);
        await scrapeRequest(urlInput);
      }
    } catch (error) {
      console.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const scrapeRequest = async (urlInput) => {
    setIsScraping(true);
    await axios.post(`${BASE_URL}/scrapy/scrape`, {
      url: urlInput,
      LIMIT: limit,
    });
  };

  // Take list of ngrams out of the fetched data
  const getWords = async (word) => {
    //Count the number of spaces (' ') to know if it is word, bigram or trigram
    let spaceCount = 0;

    for (let i = 0; i < word.length; i++) {
      if (word[i] === " ") {
        spaceCount++;
      }
    }

    let wordObject;

    try {
      if (spaceCount === 0) {
        wordObject = url.words;
      } else if (spaceCount === 1) {
        wordObject = url.bigrams;
      } else if (spaceCount === 2) {
        wordObject = url.trigrams;
      } else {
        setWordFound(false);
      }

      for (const w in wordObject) {
        if (w === word) {
          setWordNumb({
            total: wordObject[w].Total,
            frequency: wordObject[w].Frequency,
          });
          setWordFound(true);
          return;
        }
        setWordFound(false);
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const getDomains = async (domain) => {
    try {
      const res = await axios.get(`${BASE_URL}/scrapy/domains`, {
        params: { domain: domain },
      });
      setSearchResults(res.data.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  // Word count conditional output
  const result =
    wordFound === true ? (
      <div className={"results"}>
        <h4>Total: {wordNum.total}</h4>
        <h4>Frequency: {wordNum.frequency}</h4>
      </div>
    ) : wordFound === false ? (
      <div className={"results"}>
        <h4>No matches</h4>
        <h4 style={{ color: "white" }}>Total:</h4>
      </div>
    ) : (
      <div className={"results"}>
        <h4 style={{ color: "white" }}>Total:</h4>
        <h4 style={{ color: "white" }}>Frequency:</h4>
      </div>
    );

  const handleSearch = (value) => {
    if (value === "") {
      setCollectionFound(undefined);
      setSearchResults([]);
      changeDomain(false);
      return;
    }
    changeDomain(value);
    getDomains(value);
  };

  useEffect(() => {
    // Function to handle screen size changes
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    // Attach the handleResize function to the window's resize event
    window.addEventListener("resize", handleResize);
    // Call handleResize initially to apply styles based on the initial screen size
    handleResize();
  }, []);

  // refactored conditional rendering checks for loading and scraping
  const loading = isLoading ? (
    <div>
      <ProgressBar height={50} width={180} />
      <h4>Loading...</h4>
    </div>
  ) : isScraping ? (
    <div>
      <ProgressBar height={50} width={180} />
      <h4>Scraping...this may take a while</h4>
    </div>
  ) : (
    <></>
  );

  const form = (
    <>
      <input
        disabled={isScraping}
        className={"wordInput"}
        type="text"
        ref={urlRef}
        placeholder="https://"
        value={domain ? domain : null}
        onChange={(e) => handleSearch(e.target.value)}
        onClick={() => {
          changeDomain(false);
        }} //Set domain to false to be able to write on input.
        required
      />
      <div className="searchSettings">
        <h4>Crawl Length</h4>
        <input
          disabled={isScraping}
          onChange={() => setCollectionFound(undefined)}
          onClick={() => setLimit(1)}
          checked={limit === 1 ? true : false}
          type="radio"
          id="singlePage"
          name="crawlLength"
        />
        <label for="singlePage">Single Page</label>
        <input
          disabled={isScraping}
          onChange={() => setCollectionFound(undefined)}
          onClick={() => setLimit(50)}
          type="radio"
          id="manyPages"
          name="crawlLength"
        />
        <label for="manyPages">Deep Search</label>
      </div>

      <div className={'buttonsDiv'}> 
        <input disabled={collectionFound === undefined || isScraping === true} className={ isLoaded ? "button" : "buttonDis"} onClick={() => scrapeRequest(urlRef.current.value)} type='submit' value={!collectionFound ? 'Scrape' : 'Re-Scrape'}></input>
        <input disabled={isScraping} className={"button"} onClick={() => getURL(urlRef.current.value, limit)} type='submit' value='Check'></input>
      </div>
      {loading}
    </>
  )

  const logout = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/logout`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })

      if (res.status === 200) {
        changeLogin(false, null)
        sessionStorage.clear();       
        alert("Logout successful");  
        setIsHome(true);
      }
    } catch (error) {
      console.log(error)
    }

  }

  // If isHome is true, go to main page.
if (isHome === true) {
  return <Navigate to="/" />
}

  return (
    <div>
      <div className={"page"}>
        <div>
          <h3>Choose a URL</h3>
          <div className={"inputs"}>{form}</div>
          <Search results={searchResults}></Search>
          <h3>Find n-gram: </h3>
          <div className={"inputs"}>
            <input 
              disabled={!isLoaded} 
              className={"wordInput"} 
              type='text'     
              ref={wordRef} 
              required
            ></input>
            <input 
              disabled={!isLoaded}
              className={isLoaded ? "button" : "buttonDis"} 
              onClick={() => getWords(wordRef.current.value)} 
              type="submit" 
              value="Check"
            ></input>
          </div>
          {result}
        </div>
        <Histogram
          isLoaded={isLoaded}
          data={url.words}
          ner={url.ner}
          bigrams={url.bigrams}
          trigrams={url.trigrams}
          screen={screenWidth}
        ></Histogram>
        {/* <Wordcloud data={url.words} bigrams={url.bigrams} trigrams={url.trigrams} mode={outputMode}></Wordcloud> */}
        <Sentiment 
          data={url.sentiment} 
          ai_data={url.AI_Sentiment} 
          screen={screenWidth}
        ></Sentiment>
        <Classification   
          data={url.classification} 
          screen={screenWidth}
        ></Classification>
        {screenWidth <= 700 ? 
          (
            <h2 style={{textAlign: 'center', width: '100%'}} onClick={logout} type='button'>Log out</h2>
          ) : null
        }

      </div>
    </div>
  );
};

export default Landing;
