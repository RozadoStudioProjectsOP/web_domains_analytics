import React from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import { all } from 'axios';

const Histogram = (props) => {

    const [data, setData] = useState();

    useEffect (() => {
        if(props.data){
            const allData = Object.values(props.data)
            setData(allData.slice(0, 9))
        }     
    },[props]);

    //Add word name to word objects
    if (props.data){
      const keys = Object.keys(props.data)
            if (data) {
              for (let i = 0; i < data.length; i++) {
                data[i].name = keys[i]              
              }
            }
    // console.log(data)
    }

      return (
        <ResponsiveContainer width="60%" height="70%">
          <BarChart
            data={data}
          >
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
