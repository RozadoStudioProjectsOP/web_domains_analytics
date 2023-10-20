import React from 'react'
// import { createUseStyles } from "react-jss";
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector, Legend } from 'recharts';
import baseClassificationData from '../utils/classificationBaseData';

// const useStyles = createUseStyles({

// })

const Classification = (props) => {
  // const classes = useStyles();
  const [data, setData] = useState(baseClassificationData)
  const [title, setTitle] = useState('Web Classification')
  const [index, setIndex] = useState({activeIndex: null});

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

  const renderActiveShape = (props) => {
    let { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value } = props;

    return (
        <g>
            <Sector
                cx={cx}
                cy={cy}
                outerRadius={outerRadius + 5}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
        </g>
    );
};

  const state = index;

  const onPieEnter = (_, index) => {
      setIndex({
          activeIndex: index,
      });
  };

  const onPieLeave = (_, index) => {
    setIndex({
        activeIndex: null,
    });
};

    return (
      <div style={{minWidth: '47.5vw', height: '60vh'}}> 
        <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
        <text x="50%" y="25" textAnchor="middle" fontWeight="bold" fontFamily='Gill Sans' letterSpacing='0.3rem' fill='#191970' fontSize={20}>{props.screen>550 ? `${title}` : 'Web Classification'}</text>
          <Pie
            activeIndex={state.activeIndex}
            activeShape={renderActiveShape}
            dataKey="Total"
            data={data}
            cx="50%"
            cy="55%"
            outerRadius={"80%"}
            fill="#8884d8"
            label
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          >{data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            align="center"
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      </div>  
    );
}

export default Classification