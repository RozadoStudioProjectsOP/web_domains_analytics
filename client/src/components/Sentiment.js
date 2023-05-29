import React from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const testData = [
    {
      subject: 'Negative',
      A: 120,
      B: 110,
      fullMark: 150,
    },
    {
      subject: 'Positive',
      A: 98,
      B: 130,
      fullMark: 150,
    },
    {
      subject: 'Fear',
      A: 86,
      B: 130,
      fullMark: 150,
    },
    {
      subject: 'Anger',
      A: 99,
      B: 100,
      fullMark: 150,
    },
    {
      subject: 'Trust',
      A: 85,
      B: 90,
      fullMark: 150,
    },
    {
      subject: 'Sadness',
      A: 65,
      B: 85,
      fullMark: 150,
    },
  ];

const Sentiment = () => {
    return (
        <ResponsiveContainer width="35%" height="40%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={testData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      );
}

export default Sentiment