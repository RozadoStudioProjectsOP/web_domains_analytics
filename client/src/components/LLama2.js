import React from 'react'
import { createUseStyles } from "react-jss";
import { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import baseSentimentData from '../utils/sentimentBaseData';

const useStyles = createUseStyles({
  window: {
    minWidth: '47.5vw',
    minHeight: '60vh', 
    height: '80vh',
    display: 'flex', 
    flexDirection: 'row',
    '@media (max-width: 960px)': {
      flexDirection: 'column'
    },
  },
  neutral: {
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
    '@media (max-width: 960px)': {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'baseline',
      width: '50%',
    },
  },
  button: {
    minWidth: '6vw',
    padding: '12px 20px',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    background: '#D9E4EC',
    fontWeight: 'bold',
    marginRight: 15,
    boxShadow: "4px 4px 5px 1px rgba(0, 0, 0, 0.25)",
    transition: "transform 50ms",
    '@media (max-width: 960px)': {
      margin: 0,
      marginBottom: 20
    },
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
    marginRight: 15,
    '@media (max-width: 960px)': {
      margin: 0,
      marginBottom: 20
    },
  }
})

const Llama2 = (props) => {

  const classes = useStyles();
  const [data, setData] = useState(baseSentimentData);
  const [toggle, setToggle] = useState(false)
  const [title, setTitle] = useState("Sentiment Data (NRCLex)")
  const [buttonDisabled, setButtonDissabled] = useState(true)
  const [neutral, setNeutral] = useState("")
  
  const processData = (datas) => {
    // Data need to be processed to index it with numbers
    let allData = Object.values(datas) 
    setData(allData)  
  }

  // Toggle charts
  const toggleChart = () => {
    if(!toggle) {
      setToggle(true)
      setTitle("Sentiment Data (Llama2)")
      
      // Convert the object properties into an array of objects
      const aiSentimentArray = Object.values(props.data);

      // Find the element with name 'Neutral'
      const neutralElement = aiSentimentArray.find(item => item.name === 'Neutral');
      setNeutral(neutralElement.Total)

      // Filter out the element with name 'Neutral'
      const validEmotions = ["Joy", "Anger", "Disgust", "Fear", "Sadness", "Surprise", "Trust"];
      const filteredData = aiSentimentArray.filter(item => validEmotions.includes(item.name));

      // Sort the array in descending order based on the 'Total' property
      //const sortedData = filteredData.sort((a, b) => b.Total - a.Total);

      // Get the first 10 elements from the sorted array
      const top6Sentiments = filteredData.slice(0, 10);

      processData(top6Sentiments)
    } else {
      setToggle(false)
      setTitle("Sentiment Data (NRCLex)")
      processData(props.data)
    }  
  }  
  
  useEffect(() => {
    if(props.data){
      setToggle(false)
      processData(props.data)
      setTitle("Sentiment Data (NRCLex)")
      setButtonDissabled(false)
    } else {
      // If no data
      setData(baseSentimentData)
      setTitle("Sentiment Data")
    }
  }, [props.data])

    return (
      <div className={classes.window}> 
        <ResponsiveContainer width={props.screen<960 ? "90%" : "100%"} height={props.screen<960 ? "90%" : "100%"}>
          <RadarChart cx="50%" cy="55%" outerRadius="80%" data={data}>
            <text x="50%" y="25" textAnchor="middle" fontWeight="bold" fontFamily='Gill Sans' letterSpacing='0.3rem' fill='#191970' fontSize={20}>{props.screen>550 ? `${title}` : 'Sentiment Analysis'}</text>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar name="Mike" dataKey="Total" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
        <div className={classes.neutral}>
          {buttonDisabled ? (
            <button className={classes.buttonDis} onClick={toggleChart} disabled>Change</button>
          ) : (
            <button className={classes.button} onClick={toggleChart}>Change</button>
          )}
          {toggle ? (
            <p style={{marginTop: 25, fontWeight: 'bold', fontFamily: 'Gill Sans', color: '#191970'}}>Neutral: {neutral}</p>
          ) : (
            null
          )}
        </div>
      </div>  
      );
}

export default Llama2