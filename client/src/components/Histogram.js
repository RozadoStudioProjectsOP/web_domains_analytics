import React from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import { all } from 'axios';

const Histogram = (props) => {

    const [data, setData] = useState();

    useEffect (() => {
      // Modify data to have a numeric index
      if(props.data){
          const allData = Object.values(props.data)
          setData(allData.slice(0, 9))
      }     
    },[props]);

    // Add word name as a data field to the indexed data 
    if (props.data){
      const keys = Object.keys(props.data)
            if (data) {
              for (let i = 0; i < data.length; i++) {
                data[i].name = keys[i]              
              }
            }
    }

      return (
        <ResponsiveContainer width="60%" height="70%">
          <BarChart
            data={data}
            margin={{
              top: 40,
              bottom: 5,
            }}
          >
            <text x="50%" y="25" textAnchor="middle" fontWeight="bold" fontFamily='Gill Sans' letterSpacing='0.3rem' fill='#191970' fontSize={20}>Top 10 Words</text>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left"/>
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Total" fill="#82ca9d" yAxisId="left"/>
            <Bar dataKey="Frequency" fill="#8884d8" yAxisId="right"/> 
          </BarChart>
        </ResponsiveContainer>
      );
}

export default Histogram
