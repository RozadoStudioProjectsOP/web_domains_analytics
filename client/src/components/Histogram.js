/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  button: {
    minWidth: '7vw',
    padding: '12px 20px',
    marginBottom: 20,
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    background: '#D9E4EC',
    fontWeight: 'bold',
    fontSize: "1rem",
    marginLeft: 20,
    boxShadow: "4px 4px 5px 1px rgba(0, 0, 0, 0.25)",
    transition: "transform 50ms",
    '&:hover': {
        background: '#385E72',
        color: 'white'
    },
    "&:active": {
        transform: "translateY(4px)",
        boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0.75)",
    }
  },
  buttonDis: {
    width: '7vw',
    padding: '12px 20px',
    marginBottom: 20,
    border: 'none',
    borderRadius: 5,
    background: '#D9E4EC',
    fontWeight: 'bold',
    marginLeft: 20,
  }
  })

const Histogram = (props) => {

  const classes = useStyles();
  const [data, setData] = useState([{
    Total: 0,
    Frequency: 0,
    name: ''
  }]);
  const [histoText, setHistoText] = useState()
  const [outputMode, setOutputMode] = useState()

  // Modify data to have a numeric index. The index of the words array from the DB is the word itself.
  // The chart needs a numeric index to work.
  const processData = (datas) => {

    //Separate values from index.
    let allData = Object.values(datas)
    let keys = Object.keys(datas)

    //Put the index value as a parameter called 'name' inside of the object.
    if (allData) {
      for (let i = 0; i < allData.length; i++) {
        allData[i].name = keys[i]
      }
    }

    // Sort words from most to less repeated  
    allData.sort((a, b) => {
      if (a.Total > b.Total) {
        return -1;
      }
      if (a.Total < b.Total) {
        return 1;
      }
      return 0;
    })

    // Map all data to get a new array with numeric indexes
    const allDataHist = allData.map((a) => {
      return { Total: a.Total, Frequency: a.Frequency, name: a.name }
    })

    //Convert to upper case histogram's title
    const toUpper = (outputMode).charAt(0).toUpperCase() + (outputMode).slice(1)
    setHistoText(toUpper)

    //Take top 10 words for the histogram
    setData(allDataHist.slice(0, 10))

  }

  // Handle mode selected with buttons
  const handleModeSelection = (mode) => {
    setOutputMode(mode)
  }

  // Ngrams buttons. If data not loaded the are disabled
  const ngrams = props.isLoaded ? (
    <div style={{display: 'flex', flexDirection: 'column', alignContent: 'end'}}>
      <input className={classes.button} onClick={() => handleModeSelection('words')} type="submit" value="Words"></input>
      <input className={classes.button} onClick={() => handleModeSelection('bigrams')} type="submit" value="Bigrams"></input>
      <input className={classes.button} onClick={() => handleModeSelection('trigrams')} type="submit" value="Trigrams"></input>
      <input className={classes.button} onClick={() => handleModeSelection('ner')} type="submit" value="NER"></input>
    </div>
  ) : (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <input className={classes.buttonDis} onClick={() => handleModeSelection('words')} type="submit" value="Words" disabled></input>
      <input className={classes.buttonDis} onClick={() => handleModeSelection('bigrams')} type="submit" value="Bigrams" disabled></input>
      <input className={classes.buttonDis} onClick={() => handleModeSelection('trigrams')} type="submit" value="Trigrams" disabled></input>
      <input className={classes.buttonDis} onClick={() => handleModeSelection('ner')} type="submit" value="NER" disabled></input>
    </div>
  )

  //Histogram output changes depending on the mode 
  useEffect(() => {
    if (outputMode === 'words') {
      processData(props.data)
    } else if (outputMode === 'bigrams') {
      processData(props.bigrams)
    } else if (outputMode === 'trigrams') {
      processData(props.trigrams)
    } else if (outputMode === 'ner') {
      processData(props.ner)
    } else {
      // If no data 
      if(!props.data){
        setData([{
          Total: 0,
          Frequency: 0,
          name: ''
        }])
      } else{
        setOutputMode('words')
      }
    }
  }, [props, outputMode]);

return (
  <div style={{ minWidth: '70vw', display: 'flex', flexDirection: 'row' }}>
      {ngrams}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 40,
            bottom: 5,
            right: 30
          }}
          >
          <text x="50%" y="25" textAnchor="middle" fontWeight="bold" fontFamily='Gill Sans' letterSpacing='0.3rem' fill='#191970' fontSize={20}>Top 10 {histoText}</text>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Total" fill="#82ca9d" yAxisId="left" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Histogram
