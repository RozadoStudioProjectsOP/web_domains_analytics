import React from 'react'
// import { createUseStyles } from "react-jss";
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import baseClassificationData from '../utils/classificationBaseData';

// const useStyles = createUseStyles({

// })

const Classification = (props) => {
  // const classes = useStyles();
  const [data, setData] = useState(baseClassificationData)
  const [title, setTitle] = useState('Web Classification')

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9C27B0', '#E91E63', '#673AB7', '#4CAF50'];
  
  const processData = (datas) => {
    // Data need to be processed to index it with numbers
    let allData = Object.values(datas) 
    setData(allData)  
  }
  
  useEffect(() => {
    if(props.data){
      processData(props.data)
      setTitle('Web Classification (DistilBERT)')
    } else {
      // If no data
      setData(baseClassificationData)
    }
  }, [props.data])

    return (
      <div style={{minWidth: '47.5vw', height: '60vh'}}> 
        <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
        <text x="50%" y="25" textAnchor="middle" fontWeight="bold" fontFamily='Gill Sans' letterSpacing='0.3rem' fill='#191970' fontSize={20}>{title}</text>
          <Pie
            dataKey="Total"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="55%"
            outerRadius={180}
            fill="#8884d8"
            label
          >{data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      </div>  
    );
}

export default Classification