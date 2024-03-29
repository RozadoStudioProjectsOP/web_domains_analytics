import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { PieChart, Pie, Sector, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts';
import { WidthContext } from '../contexts/screenWidth';
import basePosNeg from '../utils/basePosNedData';

const Llama2PosNeg = (props) => {

    const { screenWidth } = useContext(WidthContext);
    const [data, setData] = useState(basePosNeg);
    const [index, setIndex] = useState({ activeIndex: null });

    const COLORS = ['#AFE1AF', '#ff9c84', '#87CEEB'];

    const processData = (datas) => {
        // Data need to be processed to index it with numbers
        let allData = Object.values(datas)
        setData(allData)
    }

    const modData = (data) => {
        // Convert the object properties into an array of objects
        const aiSentimentArray = Object.values(data);

        // Filter out wrong entries
        const validEmotions = ["Positive", "Negative", "Neutral"];
        const filteredData = aiSentimentArray.filter(item => validEmotions.includes(item.name));

        // Sort data in order: positive, negative, neutral
        filteredData.sort((a, b) => {
            const order = ['Positive', 'Negative', 'Neutral'];
            return order.indexOf(a.name) - order.indexOf(b.name);
        });

        processData(filteredData)
    }

    useEffect(() => {
        if (props.data) {
            modData(props.data)
        } else {
            // If no data
            setData(basePosNeg)
        }

    }, [props.data]) // eslint-disable-line

    const renderActiveShape = (props) => {
        let { cx, cy, innerRadius, outerRadius, startAngle, endAngle,
            fill } = props;
        if (fill === '#AFE1AF') { fill = "#93C572" }
        if (fill === '#ff9c84') { fill = "#E3735E" }
        if (fill === '#87CEEB') { fill = "#0096FF" }
        return (
            <g>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
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
        <ResponsiveContainer width={screenWidth < 960 ? "90%" : "100%"} height={screenWidth < 960 ? "90%" : "100%"}>
            <PieChart width={400} height={400}>
            <text x={screenWidth < 960 ? "50%" : "60%"} y="25" textAnchor="middle" fontWeight="bold" fontFamily='Gill Sans' letterSpacing='0.3rem' fill='#191970' fontSize={20}>{screenWidth < 960 ? "Sentiment Analysis" : "Sentiment Analysis (Llama2)"}</text>
                <Pie
                    activeIndex={state.activeIndex}
                    activeShape={renderActiveShape}
                    dataKey="Total"
                    startAngle={180}
                    endAngle={0}
                    data={data}
                    cx="50%"
                    cy="65%"
                    outerRadius={"80%"}
                    innerRadius={"40%"}
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
    );
}

export default Llama2PosNeg