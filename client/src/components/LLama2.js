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
    const validEmotions = ["Joy", "Anger", "Criticism", "Fear", "Sadness", "Surprise", "Trust", "Enthusiasm", "Confusion",
    "Jealousy", "Calm", "Anxiety", "Pride", "Shame", "Guilt", "Hope", "Excitement", "Gratitude", "Regret", "Compassion", "Grief"];
    const filteredData = aiSentimentArray.filter(item => validEmotions.includes(item.name));

    // Sort the array in descending order based on the 'Total' property
    const sortedData = filteredData.sort((a, b) => b.Total - a.Total);

    // Get the first 10 elements from the sorted array
    const top6Sentiments = sortedData.slice(0, 6);
    processData(top6Sentiments)
  }

  useEffect(() => {
    if (props.data) {
      modData(props.data)
    } else {
      // If no data
      setData(baseSentimentData)
    }
  }, [props.data])  // eslint-disable-line

  return (
    <>
      <ResponsiveContainer width={screenWidth < 960 ? "90%" : "100%"} height={screenWidth < 960 ? "90%" : "100%"}>
        <RadarChart cx="50%" cy="55%" outerRadius="80%" data={data}>
        <text x={screenWidth < 960 ? "50%" : "60%"} y="25" textAnchor="middle" fontWeight="bold" fontFamily='Gill Sans' letterSpacing='0.3rem' fill='#191970' fontSize={20}>{screenWidth < 960 ? "Sentiment Analysis" : "Sentiment Analysis (Llama2)"}</text>
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