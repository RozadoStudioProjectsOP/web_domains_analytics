import React from 'react'
import { createUseStyles } from "react-jss";
import { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import baseSentimentData from '../utils/sentimentBaseData';

const useStyles = createUseStyles({
  button: {
    width: '6vw',
    padding: '12px 20px',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    background: '#D9E4EC',
    fontWeight: 'bold',
    marginRight: 15,
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
})

const Sentiment = (props) => {

  const classes = useStyles();
  const [data, setData] = useState(baseSentimentData);
  const [toggle, setToggle] = useState(false)
  const [title, setTitle] = useState("Sentiment Data (NRCLex)")
  
  const processData = (datas) => {
    // Data need to be processed to index it with numbers
    let allData = Object.values(datas) 
    setData(allData)  
  }

  // Toggle charts
  const toggleChart = () => {
    if(!toggle) {
      setToggle(true)
      setTitle("Sentiment Data (RoBERTa)")
      
      // Convert the object properties into an array of objects
      const aiSentimentArray = Object.values(props.ai_data);
      console.log(aiSentimentArray)

      // Sort the array in descending order based on the 'Total' property
      const sortedData = aiSentimentArray.sort((a, b) => b.Total - a.Total);

      // Get the first 6 elements from the sorted array
      const top5Sentiments = sortedData.slice(0, 6);

      processData(top5Sentiments)
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
    } else {
      // If no data
      setData(baseSentimentData)
      setTitle("Sentiment Data")
    }
  }, [props.data])

    return (
      <div style={{minWidth: '41vw', height: '60vh', display: 'flex', flexDirection: 'row'}}> 
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <text x="50%" y="25" textAnchor="middle" fontWeight="bold" fontFamily='Gill Sans' letterSpacing='0.3rem' fill='#191970' fontSize={20}>{title}</text>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar name="Mike" dataKey="Total" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
        <div>
          <button className={classes.button} onClick={toggleChart}>Change</button>
        </div>
      </div>  
      );
}

export default Sentiment