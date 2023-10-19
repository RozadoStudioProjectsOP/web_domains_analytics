import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { PieChart, Pie, Sector, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { WidthContext } from '../contexts/screenWidth';
import basePosNeg from '../utils/basePosNedData';

const Llama2PosNeg = (props) => {

    const { screenWidth } = useContext(WidthContext);
    const [data, setData] = useState(basePosNeg);
    const [title, setTitle] = useState("Sentiment Data (Llama2)")

    const COLORS = ['#AFE1AF', '#FF5733', '#B2BEB5'];

    const processData = (datas) => {
        // Data need to be processed to index it with numbers
        let allData = Object.values(datas)
        setData(allData)
    }

    const modData = (data) => {
        // Convert the object properties into an array of objects
        const aiSentimentArray = Object.values(data);

        // Filter out the element with name 'Neutral'
        const validEmotions = ["Positive", "Negative", "Neutral"];
        const filteredData = aiSentimentArray.filter(item => validEmotions.includes(item.name));

        // Sort data i order: positive, negative, neutral
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
            setTitle("Sentiment Data")
        }
    }, [props.data])
    
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
                <text x="50%" y="25" textAnchor="middle" fontWeight="bold" fontFamily='Gill Sans' letterSpacing='0.3rem' fill='#191970' fontSize={20}>{screenWidth > 550 ? `${title}` : 'Sentiment Analysis'}</text>
                <Pie
                    dataKey="Total"
                    startAngle={180}
                    endAngle={0}
                    data={data}
                    cx="50%"
                    cy="60%"
                    outerRadius={"80%"}
                    label
                >{data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
}

export default Llama2PosNeg