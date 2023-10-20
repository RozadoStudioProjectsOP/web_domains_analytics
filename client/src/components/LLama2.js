import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { WidthContext } from '../contexts/screenWidth';
import baseSentimentData from '../utils/sentimentBaseData';

const Llama2 = (props) => {

  const { screenWidth } = useContext(WidthContext);
  const [data, setData] = useState(baseSentimentData);

  const processData = (datas) => {
    // Data need to be processed to index it with numbers
    let allData = Object.values(datas)
    setData(allData)
  }

  const modData = (data) => {
    // Convert the object properties into an array of objects
    const aiSentimentArray = Object.values(data);
  
    // Filter out the element with name 'Neutral'
    const validEmotions = ["Joy", "Anger", "Disgust", "Fear", "Sadness", "Surprise", "Trust"];
    const filteredData = aiSentimentArray.filter(item => validEmotions.includes(item.name));
  
    // Get the first 10 elements from the sorted array
    const top6Sentiments = filteredData.slice(0, 10);
    processData(top6Sentiments)
  }

  useEffect(() => {
    if (props.data) {
      modData(props.data)
    } else {
      // If no data
      setData(baseSentimentData)
    }
  }, [props.data])
  console.log(props.data)
  return (
    <>
      <ResponsiveContainer width={screenWidth < 960 ? "90%" : "100%"} height={screenWidth < 960 ? "90%" : "100%"}>
        <RadarChart cx="50%" cy="55%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis />
          <Radar name="Mike" dataKey="Total" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </>
  );
}

export default Llama2