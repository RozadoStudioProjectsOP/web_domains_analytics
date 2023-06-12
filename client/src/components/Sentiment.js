import React from 'react'
import { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import baseSentimentData from '../utils/sentimentBaseData';

const Sentiment = (props) => {

  const [data, setData] = useState(baseSentimentData);
  
  const processData = (datas) => {
    // Need to do this to index the data with numbers
    let allData = Object.values(datas) 
    setData(allData)  
  }

  useEffect(() => {
    if(props.data){
      processData(props.data)
    } else {
      // If no data
      setData(baseSentimentData)
    }
  }, [props.data])

    return (
      <div style={{minWidth: '30vw', height: '60vh'}}> 
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <text x="50%" y="25" textAnchor="middle" fontWeight="bold" fontFamily='Gill Sans' letterSpacing='0.3rem' fill='#191970' fontSize={15}>Sentiment Data</text>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar name="Mike" dataKey="total" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>  
      );
}

export default Sentiment