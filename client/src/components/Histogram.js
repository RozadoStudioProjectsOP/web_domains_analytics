/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

const Histogram = (props) => {

  const [data, setData] = useState([{
    Total: 0,
    Frequency: 0,
    name: ''
  }]);
  const [histoText, setHistoText] = useState()

// Modify data to have a numeric index. The index of the words array from the DB is the word itself.
// The chart needs a numeric index to work.
  const processData = (datas) => {

    //Separate values from index.
    let allData = Object.values(datas)
    let keys = Object.keys(datas)

    //Put the index value as a parameter called 'name' inside of the object.
    if (allData) {
        for (let i = 0; i < allData.length; i++) {
          allData[i].name = keys[i]              
        }
      }

    // Sort words from most to less repeated  
    allData.sort((a, b) => {
      if (a.Total > b.Total) {
        return -1;
      }
      if (a.Total < b.Total) {
        return 1;
      }
      return 0;
    })    

    // Map all data to get a new array with numeric indexes
    const allDataHist = allData.map((a) => {
      return {Total:a.Total, Frequency:a.Frequency, name:a.name}
    })

    //Convert to upper case histogram's title
    const toUpper = (props.mode).charAt(0).toUpperCase() + (props.mode).slice(1)
    setHistoText(toUpper)

    //Take top 10 words for the histogram
    setData(allDataHist.slice(0, 10))   

  }

  //Histogram output changes depending on the mode 
  useEffect (() => {
    if (props.mode === 'words'){
      processData(props.data) 
    } else if (props.mode === 'bigrams'){
      processData(props.bigrams) 
    } else if (props.mode === 'trigrams'){
      processData(props.trigrams) 
    } else {
      // If no data 
      setData([{
        Total: 0,
        Frequency: 0,
        name: ''
      }])
    }
  },[props]);

  return (
    <div style={{minWidth: '60vw'}}>       
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 40,
          bottom: 5,
          right: 30
        }}
        >
        <text x="50%" y="25" textAnchor="middle" fontWeight="bold" fontFamily='Gill Sans' letterSpacing='0.3rem' fill='#191970' fontSize={20}>Top 10 {histoText}</text>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left"/>
        <Tooltip />
        <Legend />
        <Bar dataKey="Total" fill="#82ca9d" yAxisId="left"/>
      </BarChart>
    </ResponsiveContainer>
      </div>
  );
}

export default Histogram
