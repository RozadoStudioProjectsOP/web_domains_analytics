import React from 'react'
import WordCloud from 'react-d3-cloud';
import { useEffect, useState, useCallback } from 'react';

const Wordcloud = (props) => {

  const [data, setData] = useState([{
      Total: 0,
      Frequency: 0,
      text: ''
    }]);
    //console.log(data)
      // Modify data to have a numeric index 
    const processData = (datas) => {
      let allData = Object.values(datas)
      let keys = Object.keys(datas)
      if (allData) {
          //let totalWords = allData.length
          for (let i = 0; i < allData.length; i++) {
            // console.log(totalWords)
            allData[i].text = keys[i] 
            // allData[i].Total = totalWords / allData.length
            // totalWords--       
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
        setData(allData.slice(0, 100))    
    }

    useEffect (() => {
      if (props.mode === 'words'){
        processData(props.data) 
      };
      if (props.mode === 'bigrams'){
        processData(props.bigrams) 
      };
      if (props.mode === 'trigrams'){
        processData(props.trigrams) 
      };
    },[props]);

    const calculateFontSize = useCallback((word) => Math.sqrt(word.Frequency) * 900, []);

    const options = useCallback(() => ({
      font: 'Verdana',
      fontStyle: 'italic',
      fontWeight: 'bold',
      padding: 2,
      width: 1400,
      rotate: 0,
    }), []);

  return (
    <WordCloud
        data={data}
        options={options}
        fontSize={calculateFontSize}
        padding={2}
        width={1400}
        rotate={0} 
    />
);
}

export default Wordcloud