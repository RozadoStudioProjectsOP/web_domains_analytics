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
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Frequency" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      );
}

export default Histogram
