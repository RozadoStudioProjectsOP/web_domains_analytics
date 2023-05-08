import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

const Histogram = (props) => {

    const [data, setData] = useState([{
      Total: 0,
      Frequency: 0,
      name: ''
    }]);

    useEffect (() => {
      // Modify data to have a numeric index
      if(props.data){

        let allData = Object.values(props.data)

        let keys = Object.keys(props.data)
        if (allData) {
            for (let i = 0; i < allData.length; i++) {
              allData[i].name = keys[i]              
            }
          }
          
        allData.sort((a, b) => {
          if (a.Total > b.Total) {
            return -1;
          }
          if (a.Total < b.Total) {
            return 1;
          }
          return 0;
        })    
        // I had to create a new array to avoid a bug 
        const allDataHist = allData.map((a) => {
          return {Total:a.Total, Frequency:a.Frequency, name:a.name}
        })
        
        setData(allDataHist.slice(0, 10))
      }     
    },[props]);

      return (
        <ResponsiveContainer width="60%" height="54%">
          <BarChart
            data={data}
            margin={{
              top: 40,
              bottom: 5,
              right: 30
            }}
          >
            <text x="50%" y="25" textAnchor="middle" fontWeight="bold" fontFamily='Gill Sans' letterSpacing='0.3rem' fill='#191970' fontSize={20}>Top 10 Words</text>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left"/>
            <Tooltip />
            <Legend />
            <Bar dataKey="Total" fill="#82ca9d" yAxisId="left"/>
          </BarChart>
        </ResponsiveContainer>
      );
}

export default Histogram
