import React from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

const Histogram = (props) => {

    const [data, setData] = useState();
    //console.log(data[0])
    useEffect (() => {
        if(props.data){
            setData(Object.values(props.data))
            console.log(data)
        }
        
    },[props]);
           
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={30}
            height={30}
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
